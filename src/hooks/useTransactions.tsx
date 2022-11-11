import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../components/services/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// Temos estes três modos de criar uma interface que já tenha dados que estão sendo usados mais você não quer todos 

//omit vai omitir qual informação você não quer já o Pick é o oposto vai revelar qual informação você quer passar.


//interface TransactionInput{
//    title: string;
//   amount: number;
//    type: string;
//    category: string;
//}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category>


//

interface trasactionsProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );

export function TransactionsProvider({children}: trasactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions').then(response => setTransactions(response.data.transactions));
           
    }, []);

    async function createTransaction (transactionInput: TransactionInput ){
     const response = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date(),
    })
     const { transaction } = response.data;

     setTransactions([
        ...transactions, transaction,
     ])
    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)

    return context;
}


