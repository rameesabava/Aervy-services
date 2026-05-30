import apiService from "../api/apiService";

// register api : called by Register component when register button clicked
export const registerAPI = async (userData) => {
    return await apiService("POST", "/register", userData)
}

// provider register api : called by Provider register component when register button clicked
export const providerRegisterAPI = async (userData) => {
    return await apiService("POST", "/provider-register", userData)
}

// user login : called by login component when login button clicked
export const loginAPI = async (userData) => {
    return await apiService("POST", "/login", userData)
}

// provider login : called by login component when login button clicked
export const providerLoginAPI = async (userData) => {
    return await apiService("POST", "/provider-login", userData)
}

// get pending providers: called by admin dashboard component
export const pendingProvidersAPI = async () => {
    return await apiService("GET", "/admin/pending-providers", {})
}

// approve status of providers: called by admin dashboard component
export const approveProvidersAPI = async (id) => {
    return await apiService("PUT", `/admin/provider-approve/${id}`, {})
}

// reject providers: called by admin dashboard component
export const rejectProvidersAPI = async (id) => {
    return await apiService("DELETE", `/admin/provider-reject/${id}`, {})
}

// get approved providers: called by services component
export const getApprovedProvidersAPI = async () => {
    return await apiService("GET", "/approved-providers", {})
}

// get single provider view: called by view component
export const getSingleProviderAPI = async (id) => {
    return await apiService("GET", `/provider/view/${id}`, {})
}

// booking payment: called by view component
export const bookingPaymentAPI = async (reqBody, header) => {
    return await apiService("POST", "/booking-payment", reqBody,header)
}

// get single provider view: called by providerDashboard component
export const getProviderDetailsAPI = async (id) => {
    return await apiService("GET", `/provider/${id}`, {})
}

// get provider bookings : called by providerBookings component
export const getProviderBookingsAPI = async (id) => {
    return await apiService("GET", `/provider/bookings/${id}`, {})
}

// update provider booking status completed : called by providerBookings component
export const updateProviderBookingCompleteAPI = async (reqBody) => {
    return await apiService("PUT", `/provider/complete-bookings`, reqBody)
}

// update provider booking status rejected : called by providerBookings component
export const updateProviderBookingRejectAPI = async (reqBody) => {
    return await apiService("PUT", `/provider/reject-bookings`, reqBody)
}

// edit provider profile : called by providerProfile component
export const editProviderProfile = async (id, reqBody) => {
    return await apiService("PUT", `/profile/${id}`,reqBody)
}