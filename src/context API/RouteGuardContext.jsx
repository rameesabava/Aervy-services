import React, { createContext, useEffect, useState } from 'react'

export const routeContext = createContext('')

function RouteGuardContext({ children }) {

  const [role, setRole] = useState('')
  const [authorisedUser, setAuthorisedUser] = useState(false)
  
 useEffect(() => {
  const user = JSON.parse(sessionStorage.getItem("user"))

  if (user) {
    setAuthorisedUser(true)
    setRole(user.role)
  }
}, [])

  return (
    <routeContext.Provider value={{ role, setRole, authorisedUser, setAuthorisedUser }}>
      {children}
    </routeContext.Provider>
  )
}

export default RouteGuardContext