//zc4we-z3iqn-5qlff-lupj2-cnbso-komno-6k6nw-6a2wf-daula-rhbpk-oae

import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
    
    //assigning tokens to the default user
    //converting text to principal
    let owner : Principal = Principal.fromText("zc4we-z3iqn-5qlff-lupj2-cnbso-komno-6k6nw-6a2wf-daula-rhbpk-oae");

    //total supply of tokens
    let totalSupply : Nat = 1000000000;

    //symbol for token
    let symbol : Text = "DJAN";

    //temporary array for inbetween upgrades
    private stable var balanceEntries: [(Principal, Nat)] = [];

    //creating hashmap to associate tokenamount to id's
    //key = Principal, value = type Nat
    //(1 = Initial size of hashmap,
    //Principal.equal = check for inputed Principal is stored Principal,
    //Principal.hash = how to hash the keys)
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    //check if hashmap is empty
        if (balances.size() < 1) {
            //inserting the value (totalSupply) to key (owner)
            balances.put(owner, totalSupply);
        };

    //checking the balance of owners
    public query func balanceOf(who: Principal) : async Nat {

        //checking if the result of balances.get is an optional
        let balance : Nat = switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol () : async Text {
        return symbol;
    };

    //claiming free tokens
    public shared(msg) func payOut() : async Text {

        //checking if id exists 
        if (balances.get(msg.caller) == null) {
            
            let amount = 10000;
            //transferring token to the caller id with .put(key, value)
            balances.put(msg.caller, amount);
            return "Success";
        } else {
            return "Already claimed tokens!";
        }   
    };

    //transferring token from msg.caller to inputed id
    public shared(msg) func transfer (to: Principal, amount: Nat) : async Text {
        //get balance from caller
        let fromBalance = await balanceOf(msg.caller);
        //check if transfer amount is smaller than balance
        if (fromBalance > amount){
            //setting new acc balance
            let newFromBalance : Nat = fromBalance - amount;
            //updating ledger with caller id and new balance
            balances.put(msg.caller, newFromBalance);

            //getting balance from user inputed id
            let toBalance = await balanceOf(to);
            //updating balance with amount transfered
            let newToBalance = toBalance + amount;
            //updating the HashMap with key (to) and value (newToBalance)
            balances.put(to, newToBalance);
            return "Success!";
        } else {
            return "Insufficient funds!"
        }
    };

    //shifting the hashmap into stable array
    system func preupgrade(){
        //iterating hashmap items and storing entries into array
        balanceEntries := Iter.toArray(balances.entries());
    };

    //shifting entries back to hashmap
    system func postupgrade(){
        //iterating through array and assigning them back to hashmap
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    };






};