import Header from './components/Header'
import AddTasks from './components/AddTasks'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

function App() {
  


  return (
   <div className='container mx-auto h-screen flex flex-col bg-blue-50'>
  <Header className='h-1/6'/>
  <div className='h-full flex flex-col'>
  <AddTasks className='h-1/4' />
  <TaskList className='h-3/4' />
  </div>
  <Footer className='h-1/6' />

   </div>
  )
}

export default App
