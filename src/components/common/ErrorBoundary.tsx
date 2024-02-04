import React, { Component } from 'react'

interface Props{
  children:React.ReactNode;
}
interface State{
  hasError:boolean
}

 class ErrorBoundary extends Component<Props,State> {
  
  constructor(props:Props){
    super(props)
    this.state={
      hasError:false
    }
  }
  
  static getDerivedStateFromError(){
    return{
      hasError:true
    }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error,errorInfo)
    this.setState({hasError:true})
  }

  render() {
    if(this.state.hasError){
      return <h1>Something went wrong</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary