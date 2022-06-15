import React, { Component } from "react";
import  { Toaster, toast }from 'react-hot-toast';

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [], 
            _id: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e){
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success('Task Updated', {
                        style: {
                          border: '1px solid #0dcaf0',
                          padding: '16px',
                          color: '#0dcaf0',
                        },
                        iconTheme: {
                          primary: '#0dcaf0',
                          secondary: '#FFFAEE',
                        },
                      });
                    this.setState({title:'', description: '', _id: ''});
                    this.fetchTasks();
                })
                .catch(err => console.error(err))
        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success('Task Saved');
                    this.setState({title:'', description: ''});
                    this.fetchTasks();
                })
                .catch(err => console.error(err))
        }
        
        e.preventDefault();
    }
    componentDidMount(){
        console.log('Componente corriendo');
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks')
        .then(res=> res.json())
        .then(data=> {
            this.setState({tasks: data});
            console.log(this.state.tasks);
            
        });
    }
    deleteTask(id){
        if(confirm('Are you sure you want to delte it?')){
            fetch(`/api/tasks/${id}`,{
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                
                }
                
                
            })
            .then(res => res.json())
            .then(data => {
                
                this.fetchTasks();
                toast.success('Task Delete', {
                    style: {
                      border: '1px solid #FF0000',
                      padding: '16px',
                      color: '#FF0000',
                    },
                    iconTheme: {
                      primary: '#FF0000',
                      secondary: '#FFFAEE',
                    },
                  });
                console.log('deleting...', data);
            })
              
        }
        
    }

    updateTask(id){
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data =>{
            console.log('Updatting...', data);
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })
        
    }

    handleChange(e){
        // console.log(e.target.value)
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    render(){
        return (
            <div>
                {/* NAVIGATION */}
                <nav className = "navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                    <div class="navbar-nav">
                        
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                        <a class="nav-link" href="#">Data</a>
                        
                    </div>
                    </div>
                </nav>

                <div className="container-fluid position-relative">
                <div className = "card top-0 start-50 translate-middle-x" style={{marginTop: '20px', width: '500px', heigth: 'auto', textAlign: 'center', alignContent:'center' }}>
                        
                        <div className = "card-body">
                        
                        <form onSubmit={this.addTask}>
                            <div className="mb-3">
                                <input name="title" onChange = {this.handleChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.title} placeholder='ingrese un titulo'></input>
                                
                            </div>
                            <div className="mb-3">
                                <input name="description" onChange = {this.handleChange} type="text" className="form-control" id="exampleInputPassword1" value={this.state.description} placeholder='Ingrese una leve descripcion'></input>
                            </div>
  
                            <button type="submit" className="btn btn-primary" >Submit</button>
                            </form>

                           
                        </div>

                    </div>
                </div>
                
                    
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />    

            <div className="container-fluid position-relative" style={{marginTop:'20px', heigth: 'auto'}} >{/*> */}
            <table className="table table-hover ">
                     <thead>
                         <tr>
                             <th>Title</th>
                             <th>Description</th>
                         </tr>
                     </thead>
                     <tbody>
                         {
                         this.state.tasks.map(task=>{
                            return (
                            <tr key ={task._id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                <div class="d-grid gap-2 d-md-block">
                                <button type="button" class="btn btn-danger" style={{margin: '4px'}} onClick={()=>this.deleteTask(task._id)}>Delete</button>
                                <button type="button" class="btn btn-primary" onClick={() => this.updateTask(task._id)}>Update</button>
                                </div>
                                
                                </td>
                            </tr>
                        )

                    }) }
                             
                        
                     </tbody>
                    </table>

            </div>

            {/* // <div className="position-absolute  bottom-50 top-0">
            // 
            {/* // </div>      */}
                
            </div>
            

            
        )
    }
}

export default App;