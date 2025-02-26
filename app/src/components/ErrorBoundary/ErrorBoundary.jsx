import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        hasError: false 
    }
  }

  static getDerivedStateFromError() {
    return { 
        hasError: true 
    }
  }

  render() {
    if (this.state.hasError) {
      return <h2>Что-то пошло не так. Пожалуйста, попробуйте позже.</h2>
    }

    return this.props.children
  }
}