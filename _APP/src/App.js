
import './App.css';
import {React,Fragment } from 'react'
import { ReactDOM, useEffect } from 'react';
import styles from './App.module.css';
import {useState} from 'react';
import Draggable from "react-draggable";
import {useRef } from 'react';
import $ from 'jquery'; 
// creazione elementi di prova
var array_element =  [
    {
        "id": 1,
        "name": "pos0",
        "state_color": "red"
    },
    {
        "id": 2,
        "name": "pos1",
        "state_color": "red"
    },
    {
        "id": 3,
        "name": "pos2",
        "state_color": "red"
    },
    {
        "id": 4,
        "name": "pos3",
        "state_color": "red"
    },
    {
        "id": 5,
        "name": "pos4",
        "state_color": "red"
    },
    {
        "id": 6,
        "name": "pos5",
        "state_color": "red"
    }
    ,
    {
        "id": 7,
        "name": "pos5h",
        "state_color": "red"
    }
    ,
    {
        "id": 8,
        "name": "pos54",
        "state_color": "red"
    }
    ,
    {
        "id": 9,
        "name": "pos5hg",
        "state_color": "red"
    }
    ,
    {
        "id": 10,
        "name": "pos5hgfhgfgh",
        "state_color": "red"
    },
    {
      "id": 11,
      "name": "pos5hgfhfg",
      "state_color": "red"
    },
    {
      "id": 12,
      "name": "pos5hgfh",
      "state_color": "red"
    }
    

 ];

 

function App() {


  window.addEventListener('drag', () => {
    document.body.style.cursor = 'grabbing';
    //alert("hi")
  }, true)

  const [arrayElement,setArrayElement] = useState(array_element)
  const [id_selected,getId] = useState([null,null]);    // id e timestamp 

  const [displayTodoDelete,setDisplayDelete] = useState('none');
  const [displayTodoUpdate,setDisplayUpdate] = useState('none');
  const [displayTodoInsert,setDisplayInsert] = useState('none');

  const [crud_op_todo,setCrudOperationTodo] = useState([])
  const [crudId,setIdCrud] = useState(null);
  const [crudName,setNameCrud] = useState(null);
  const [results,setResults] = useState([])

  const [colorChekList,setColorCheck] = useState(null)

  const [TempTodoGrab,setTempTodoGRab] = useState(null)

   // FUNZIONE 1    // limitato da 5 
   function UpdateResultArray(){
    var array_results = []
    arrayElement.forEach(data => {
      var value_temp = (
        <div className={styles.container} id={data.id} key={data.id}>
        <div style={{backgroundColor:data.state_color}} onClick={()=> getId([data.id,Date.now()])}>
        { (data.state_color =='green') &&
       <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
       <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
       </svg>
      } 
        </div>
          <div onClick={()=> getId([data.id,Date.now()])}>{data.name}</div>
        <div>
        <svg height="18px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.todo_cross} onClick={()=> DeleteModal(data.id,'flex')}>
           <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM12.2 10.8L10.8 12.2L8 9.4L5.2 12.2L3.8 10.8L6.6 8L3.8 5.2L5.2 3.8L8 6.6L10.8 3.8L12.2 5.2L9.4 8L12.2 10.8Z" fill="#F31010" fill-opacity="0.6"/>
        </svg>
          <br></br>
          <svg height="18px" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.todo_modify} onClick={()=> UpdateModal(data.id,'flex',data.name)}>
            <path d="M29.2909 13.4668L18.2704 24.4875C17.8254 24.9325 17.2587 25.2358 16.6416 25.3592L11.9532 26.2969L12.8909 21.6085C13.0143 20.9914 13.3176 20.4247 13.7626 19.9797L24.7831 8.95898M29.2909 13.4668L31.5448 11.2129C32.1672 10.5905 32.1672 9.58138 31.5448 8.95898L29.2909 6.70508C28.6685 6.08268 27.6594 6.08268 27.037 6.70508L24.7831 8.95898M29.2909 13.4668L24.7831 8.95898" stroke="#2E2B16" stroke-opacity="0.47" stroke-width="3.1875" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.96875 31.875H30.2812" stroke="#2E2B16" stroke-opacity="0.47" stroke-width="3.1875" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
       </div>
      </div>
        )
        array_results.push(
          <div className={styles.draggable_list}
          draggable="true"
          onDragStart={(e) => dragStartCustom(e)}
          onDragEnter={(e) => dragEnterCust(e)}
          onDragEnd={(e) => dragEnd(e)}
          cursor="grab">
            <div>{value_temp}</div>
          </div>

        )
      });
      setResults(array_results)
   }

      // FUNZIONE 1    // limitato da 5 
      function UpdateResultArraySearch(vistaArray){
        var array_results = []
        vistaArray.forEach(data => {
          var value_temp = (

          <div className={styles.container} id={data.id} key={data.id}>
            <div style={{backgroundColor:data.state_color}} onClick={()=> getId([data.id,Date.now()])}>
            { (data.state_color =='green') &&
           <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
             <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
           </svg>
          } 
            </div>
            <div onClick={()=> getId([data.id,Date.now()])}>{data.name}</div>
            <div>
            <svg height="18px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.todo_cross} onClick={()=> DeleteModal(data.id,'flex')}>
               <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM12.2 10.8L10.8 12.2L8 9.4L5.2 12.2L3.8 10.8L6.6 8L3.8 5.2L5.2 3.8L8 6.6L10.8 3.8L12.2 5.2L9.4 8L12.2 10.8Z" fill="#F31010" fill-opacity="0.6"/>
            </svg>
              <br></br>
              <svg height="18px" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.todo_modify} onClick={()=> UpdateModal(data.id,'flex',data.name)}>
                <path d="M29.2909 13.4668L18.2704 24.4875C17.8254 24.9325 17.2587 25.2358 16.6416 25.3592L11.9532 26.2969L12.8909 21.6085C13.0143 20.9914 13.3176 20.4247 13.7626 19.9797L24.7831 8.95898M29.2909 13.4668L31.5448 11.2129C32.1672 10.5905 32.1672 9.58138 31.5448 8.95898L29.2909 6.70508C28.6685 6.08268 27.6594 6.08268 27.037 6.70508L24.7831 8.95898M29.2909 13.4668L24.7831 8.95898" stroke="#2E2B16" stroke-opacity="0.47" stroke-width="3.1875" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.96875 31.875H30.2812" stroke="#2E2B16" stroke-opacity="0.47" stroke-width="3.1875" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
           </div>
          </div>   
   

            )
            array_results.push(
              <div className={styles.draggable_list}
              draggable="true"
              onDragStart={(e) => dragStartCustom(e)}
              onDragEnter={(e) => dragEnterCust(e)}
              onDragEnd={(e) => dragEnd(e)}
              cursor="grab">
                <div>{value_temp}</div>
              </div>

            )
          });
          setResults(array_results)
       }


  useEffect(() => {
    var temp_array_elm = arrayElement;
    for (const obj of temp_array_elm) {
      if (obj.id === id_selected[0] && obj.state_color === "red") {
          obj.state_color = 'green';
        break;
      }
      if (obj.id === id_selected[0] && obj.state_color === "green") {
        obj.state_color = 'red';
       break;
        }
    }
    setArrayElement(temp_array_elm)
    //console.log(arrayElement)
    UpdateResultArray()
  }, [id_selected])
  

   // CRUD OPERATIONS // 0 : id , 1 : operation , 2 : timestamp
   useEffect(() => {
  
   switch(crud_op_todo[1]) {
    case 'deleteTodo':
      // inizio delete
      var temp_array_elm = arrayElement;

      for( var i = 0; i < temp_array_elm.length; i++){ 
    
        if ( temp_array_elm[i].id === crud_op_todo[0]) { 
    
          temp_array_elm.splice(i, 1); 
        }
    
    }
      setArrayElement(temp_array_elm)
      //console.log(arrayElement)
      UpdateResultArray();
      setDisplayDelete('none')

      // fine delete
      break;

    case 'UpdateTodo':

          // inizio delete
          var temp_array_elm = arrayElement;
    
          for( var i = 0; i < temp_array_elm.length; i++){ 
        
            if ( temp_array_elm[i].id === crud_op_todo[0]) { 
        
              temp_array_elm[i].name = crudName
            }
        
        }
          setArrayElement(temp_array_elm)
          UpdateResultArray();
          setDisplayUpdate('none')

      // code block
      break;

    case 'InsertTodo':
      if(crudName == null )
        {alert("Nome non consentito")} 
      else
        {
          var array = [...arrayElement]
          array = array.sort((a,b)=> (a.id < b.id ? 1 : -1))
          // per vedere gli elementi dell array 
          var new_id = 1;
          
          if(array.length > 0){
            new_id = array[0].id;
            new_id = new_id + 1;
          }
          
          var temp_array_elm = arrayElement;
          temp_array_elm.push({"id":new_id,"name":crudName,"state_color":"red"},)
          setArrayElement(temp_array_elm)
          //console.log(arrayElement)
          UpdateResultArray();
          setDisplayInsert('none')

        }
        // code block
      break;

      case 'colorSort':

        if(crud_op_todo[0] === "all")
        {
          UpdateResultArraySearch(arrayElement);
        }
        else
        {
          var temp_array_elm = [];

            console.log(arrayElement)
            for( var i = 0; i < arrayElement.length; i++){ 
      
              console.log("[valore dell array : " + " ID: " + arrayElement[i].id + "color : " + arrayElement[i].state_color)
              if ( arrayElement[i].state_color == crud_op_todo[0]) { 
            //   alert("ok")
            temp_array_elm.push(arrayElement[i])
              }
          }
          
            UpdateResultArraySearch(temp_array_elm);
        }

    default:
      // code block
  }
  }, [crud_op_todo])


   // CRUD OPERATIONS FINE
   function DeleteModal(id,display){
      setDisplayDelete(display)
      setIdCrud(id)
  }

  function UpdateModal(id,display,name){
      setDisplayUpdate(display)
      setIdCrud(id)
      setNameCrud(name)
  }

  function InsertModal(display){
      setNameCrud(null)
      setDisplayInsert(display)
  }

  // test per utilizzare drag and drop 
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);
 
  const dragStart = (e, position) => {
    dragItem.current = position;
   console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };
  // test per utilizzare drag and drop 

  // vera implementazione del drag 


  const id_drag_start = useRef();
  const id_drag_over = useRef();


  const dragStartCustom = (e, position) => {
    
    dragItem.current = position;
  // console.log("dragStart: " + e.target.children[0].innerHTML);
   var target_temp = e.target.querySelector('div').innerHTML;
    var id_temp = $(target_temp).attr("id");
    console.log('daragstart : ' +id_temp)
    id_drag_start.current = id_temp;
  };


  const dragEnterCust = (e, position) => {
    $('div.App_container__POXpC').css("background-color","antiquewhite")
    dragOverItem.current = position;
    console.log("dragOver: " + e.target.id);
    id_drag_over.current = e.target.id;
    if($(e.target).hasClass("App_container__POXpC"))
    {

      setTempTodoGRab(e.target)
      $(e.target).css("background-color","rgba(255, 68, 0, 0.286)")
    
    }

  };


  function UpdateResultArrayDragMode(id_start,id_over){
   // alert(id_start +'----'+id_over )
    var index_value_dragstart = arrayElement.findIndex(item => item.id == id_start);
    var index_array_dragend =   arrayElement.findIndex(item => item.id == id_over);

    console.log('posizione elemento del drag start: ' + index_value_dragstart + '/n '
              + 'posizione del elemento del drag End '+ index_array_dragend )
  
  // siccome che la posizione può essere prima o dopo andiamo a definire un array con due oggetti
  // elemento con posizione più bassa results.slice(0,pos1 - 1) ( da valutare se 0)
  // il pezzo intermedio aggiunta del valore results[pos1]=val2 + results.slice(pos + 1,pos2 - 1)
  // elemento con posizione più alta results[pos2]=val1 + results.slice(pos2,results.lenght - 1)

  var array_temp_position = []

  if(index_value_dragstart > index_array_dragend){
   // alert(">" + index_value_dragstart + "--" + index_array_dragend)
    array_temp_position[0] = index_value_dragstart
    array_temp_position[1] = index_array_dragend
  }
  else if(index_value_dragstart < index_array_dragend){
   // alert("<" + index_value_dragstart + "--" + index_array_dragend)
    array_temp_position[1] = index_value_dragstart
    array_temp_position[0] = index_array_dragend
  }
  else if(index_value_dragstart === index_array_dragend)
  {
   // alert("3")
    console.log("stessa posizione ritenta")
  }
  else{
 //   alert("4")
  }

  if(array_temp_position.length > 0){
    
 //  alert("ciaooooo")
    var temp_array_elm = arrayElement;
    console.log(temp_array_elm)
  
    var temp_firstIndex = array_temp_position[0];
    var temp_secondIndex = array_temp_position[1];

    var temp_firstItem = temp_array_elm[array_temp_position[0]]
    var temp_secondtItem = temp_array_elm[array_temp_position[1]]
  
    temp_array_elm[temp_firstIndex] = temp_secondtItem
    temp_array_elm[temp_secondIndex] = temp_firstItem

    //UpdateResultArraySearch(temp_array_elm)
    setArrayElement(temp_array_elm)
    UpdateResultArray();
  }
  }


  const dragEnd = () => { 
   // dragOverItem.current = position;
   console.log("end of drag")
 //  alert("start : "+ JSON.stringify(id_drag_start) + " end : " + JSON.stringify(id_drag_over))
   
   if(id_drag_start["current"] === id_drag_over["current"] || id_drag_start["current"] == "" ){
    console.log("non ce stato nessun spostamento")
   }
   else if((id_drag_start["current"] !== "" && id_drag_over["current"] !== "")){
    UpdateResultArrayDragMode(id_drag_start["current"],id_drag_over["current"])
   }
   else{
    console.log('errore' + id_drag_start["current"])
   }

   id_drag_start.current = null;
   id_drag_start.current = null;

  };

  const dragCheckList = (e) => { 
    // dragOverItem.current = position;
    console.log('*-*-*-*')
    setColorCheck('rgba(255, 166, 0, 0.328)')

 
   };

  const dragCheckListLeave = (e) => { 
    // dragOverItem.current = position;
    console.log('*-*-*-*'+id_drag_start["current"])
    setColorCheck('#3a30')
    setIdCrud(''+id_drag_start["current"])
    setCrudOperationTodo([id_drag_start["current"],'deleteTodo',Date.now()])
    
   };


  // vera implementazione del drag 


  return (
    <div className={styles.AppContainer} onClick={() => {$('div.App_container__POXpC').css("background-color","antiquewhite")}}>
    <div className={styles.FilterContainer}>
          <div className={styles.InsertButton} onClick={()=> InsertModal('flex')}>
            INSERT
          </div>
          <div className={styles.InsertButton} onClick={()=> setCrudOperationTodo(['all','colorSort',Date.now()])}>
            ALL
          </div>
          <div className={styles.InsertButton} onClick={()=> setCrudOperationTodo(['green','colorSort',Date.now()])}>
            CHECKED
          </div>
          <div className={styles.InsertButton} onClick={()=> setCrudOperationTodo(['red','colorSort',Date.now()])}>
            TODO
          </div>
          <div className={styles.CheckListIcon} style={{backgroundColor:colorChekList}}
               onClick={()=> setCrudOperationTodo(['red','colorSort',Date.now()])} >
            <img 
            onDragOver={(e) => dragCheckList(e)}
            onDragLeave={(e) => dragCheckListLeave(e)}
            src={require('./assets/checkListIcon.png')} alt="Logo" />
          </div>
    </div>
       
      <div className={styles.ResultsContainer}>
        <div className={styles.ResultsColumn1}>
        {(results.slice(0,5) != "") && 
             results.slice(0,5)
          }
          {(results.slice(0,5) == "") && 
            <div className={styles.container_null}>
            </div>
          }
        </div>
        <div className={styles.ResultsColumn2}>
          {(results.slice(5,10) != "") && 
             results.slice(5,10)
          }
          {(results.slice(5,10) == "") && 
            <div className={styles.container_null}>
            </div>
          }

        </div>
        <div className={styles.ResultsColumn3}>
          {(results.slice(10,15) != "" ) &&
             results.slice(10,15)
          }
         {(results.slice(10,15) == "" ) &&
             <div className={styles.container_null}>
             </div>
          }
        </div>
       </div>
      

      { (displayTodoDelete == 'flex') &&  // controlla se si accende o meno il valore 
              <div className={styles.modal}>
                <div className={styles.delete_todoContier}>
                  <table width={'200px'} height={'50px'}>  
                      <tr width={'100%'}>
                        <td align={'center'}>sei sicuro di eliminarlo</td>
                      </tr>
                    </table>  
                    <table  width={'200px'} height={'50px'}>
                      <tr width={'100%'}>
                      <td width={'50%'} align={'center'} className={styles.delete_todo_yes} onClick={()=> setCrudOperationTodo([crudId,'deleteTodo',Date.now()])}>SI</td>
                      <td width={'50%'} align={'center'} className={styles.delete_todo_no} onClick={()=> setDisplayDelete('none')}>NO</td>
                      </tr>
                    </table>
                  </div>  
              </div>  
      }

      { (displayTodoUpdate == 'flex') &&  // controlla se si accende o meno il valore 
              <div className={styles.modal}>
                <div className={styles.delete_todoContier}>
                  <table width={'300px'} height={'60px'}>  
                      <tr width={'100%'}>
                        <td align={'center'} width={'90%'}>sei sicuro di aggiornarlo?</td>
                        <td width={'8%'} align={'right'}>        
                          <svg height="18px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.todo_cross} onClick={()=> setDisplayUpdate('none')}>
                             <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM12.2 10.8L10.8 12.2L8 9.4L5.2 12.2L3.8 10.8L6.6 8L3.8 5.2L5.2 3.8L8 6.6L10.8 3.8L12.2 5.2L9.4 8L12.2 10.8Z" fill="#F31010" fill-opacity="0.6"/>
                          </svg>
                        </td>
                        <td width={'2%'}></td>
                      </tr>
                    </table>  
                    <table width={'300px'} height={'60px'}>  
                      <tr width={'100%'}>
                        <td  width={'5%'}></td>
                        <td  width={'45%'} align={'left'}>NOME:</td>
                        <td  width={'5%'}></td>
                        <td  width={'40%'} align={'left'}>
                        <input value={crudName}
                                onChange={event => setNameCrud(event.target.value)}
                        />
                        </td>
                        <td  width={'5%'}></td>
                      </tr>
                    </table>  
                    <table  width={'300px'} height={'60px'}>
                      <tr width={'100%'}>
                      <td width={'45%'} align={'center'} className={styles.delete_todo_yes} onClick={()=> setCrudOperationTodo([crudId,'UpdateTodo',Date.now()])}>UPDATE</td>
                      <td width={'10%'}></td>
                      <td width={'45%'} align={'center'} className={styles.delete_todo_no} onClick={()=> setDisplayUpdate('none')}>EXIT</td>
                      </tr>
                    </table>
                  </div>  
              </div>  
      }

      { (displayTodoInsert == 'flex') &&  // controlla se si accende o meno il valore 
                    <div className={styles.modal}>
                      <div className={styles.delete_todoContier}>
                        <table width={'300px'} height={'60px'}>  
                            <tr width={'100%'}>
                              <td align={'center'} width={'90%'}>INSERIMENTO NUOVO TODO: </td>
                              <td width={'8%'} align={'right'}>        
                                <svg height="18px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.todo_cross} onClick={()=> setDisplayInsert('none')}>
                                  <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM12.2 10.8L10.8 12.2L8 9.4L5.2 12.2L3.8 10.8L6.6 8L3.8 5.2L5.2 3.8L8 6.6L10.8 3.8L12.2 5.2L9.4 8L12.2 10.8Z" fill="#F31010" fill-opacity="0.6"/>
                                </svg>
                              </td>
                              <td width={'2%'}></td>
                            </tr>
                          </table>  
                          <table width={'300px'} height={'60px'}>  
                            <tr width={'100%'}>
                              <td  width={'5%'}></td>
                              <td  width={'45%'} align={'left'}>NOME:</td>
                              <td  width={'5%'}></td>
                              <td  width={'40%'} align={'left'}>
                              <input value={crudName}
                                      onChange={event => setNameCrud(event.target.value)}
                              />
                              </td>
                              <td  width={'5%'}></td>
                            </tr>
                          </table>  
                          <table  width={'300px'} height={'60px'}>
                            <tr width={'100%'}>
                            <td width={'100%'} align={'center'} className={styles.delete_todo_yes} onClick={()=> setCrudOperationTodo([null,'InsertTodo',Date.now()])}>INSERT</td>
                            </tr>
                          </table>
                        </div>  
                    </div>  
            }

            <div draggable onDragOver={console.log('over')} onDrag={console.log('over')}>
             hhhhhhhhhhhhhhhhhhhhhhhhhh
            </div>
           <div>test per vedere come funziona drag and drop </div>
                <>
          {
          list&&
          list.map((item, index) => (
            <div style={{backgroundColor:'lightblue', margin:'20px 25%', textAlign:'center', fontSize:'40px'}}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              key={index}
              draggable>
                {item}
            </div>
            ))}
          </>
    </div>
  );
}

export default App;
