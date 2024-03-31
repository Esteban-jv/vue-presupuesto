export const formatAmount = amount => {
    return Number(amount).toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
    })
}

export const genId = () => {
    const date = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2)
    return random + date
}

export const formatDate = date => {
    const newDate = new Date(date)
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return newDate.toLocaleDateString('es-ES',options)
}