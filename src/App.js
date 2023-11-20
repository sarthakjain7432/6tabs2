import { useEffect, useState } from "react";

function App() {
  const[state,setState] = useState([]);
  const [filteredState,setFilteredState] = useState({})
  const [selectedButton, setSelectedButton] = useState("");
  useEffect(()=>{
    fetch("https://course-api.com/react-tabs-project")
    .then((res)=>res.json())
    .then((data)=>{
      setState(data)
      setFilteredState(data[0]);
      setSelectedButton(data[0].company)
    })
  },[])
  const updateState=(company)=>{
    const selectedCompany = state.find((item)=>item.company === company)
    setFilteredState(selectedCompany)
    setSelectedButton(company)
  }
  return (
    <>
    {
      state.map((item)=>
      <> 
        <button 
        onClick={()=>{updateState(item.company)}}
        style={{
              backgroundColor:
                selectedButton === item.company ? "#5dade2" : "#dde9f1",
            }}
        >{item.company}</button>
        <br/> 
      </>   
      )
    }
    <div style={{"position":"absolute","left":"100px","top":"-26px"}}>
          <>
            <h1>{filteredState.title}</h1>
            <div>{filteredState.company}</div>
            <div>{filteredState.dates}</div>
            <ul>
              {
                filteredState.duties &&
                filteredState.duties.map((duty, index) => (
                  <li key={index}>{duty}</li>
                ))
              }
            </ul>
          </>
      </div>  
    </>   
  );
}

export default App;
