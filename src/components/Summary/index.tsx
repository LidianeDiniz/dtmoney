import { useContext } from 'react';
import IncomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

import { Container } from "./styles";
import { TransactionsContext } from '../../TransactionsContext';

export function Summary (){
    const {transactions} = useContext(TransactionsContext);

  /* const totalDeposits = transactions.reduce((acc, transactions) =>{
    if (transactions.type === 'deposit'){
        return acc + transactions.amount;
    }

    return acc;
   }, 0);
   Esta também é uma maneira de calcular os valores.
   Teria que criar três variáveis uma para Entradas, uma para Saídas e uma para Total.

   Mais usaremos o código abaixo usando somente uma  variável.
   */

   const summary = transactions.reduce((acc, transaction) =>{

    if (transaction.type === 'deposit'){
        acc.deposits += transaction.amount;
        acc.total  += transaction.amount;

    }else{
        acc.withdraws += transaction.amount;
        acc.total  -= transaction.amount;
    }
    return acc;

   },{
    deposits: 0,
    withdraws: 0,
    total: 0,
   })

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeImg} alt="Entradas" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                  }).format(summary.deposits)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>-
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                  }).format(summary.withdraws)}
                </strong>
            </div>

            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                  }).format(summary.total)}
                </strong>
            </div>
            
            

        </Container>
    )
}