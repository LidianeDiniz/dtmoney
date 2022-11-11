import Modal from 'react-modal'
import { Header } from './components/Header';
import Dashboard from './components/Dashboard/index';
import { useState } from 'react';
import { NewTransacitionModal } from './components/NewtransacitonModal/index';
import { TransactionContext } from './TransactionsContext';

import { GlobalStyle } from './styles/styles.global';

Modal.setAppElement('#root');

export function App() {

  const[isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionsModal(){
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionsModal(){
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionContext.Provider value={[]}>
     <Header onOpenNewTransactionModal={ handleOpenNewTransactionsModal}/>

     <Dashboard/>

     <NewTransacitionModal 
     isOpen={isNewTransactionModalOpen}
     onRequestClose={handleCloseNewTransactionsModal}/>


     <GlobalStyle />
    

    </TransactionContext.Provider>
  );
}


