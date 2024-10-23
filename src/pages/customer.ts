export const headerContainer = () => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})

export const title = () => ({
  fontWeight: 500,
  fontSize: '1.25rem',
  marginBottom: '20px',
  marginLeft: '10px'
})

export const buttonsContainer = () => ({
  display: 'flex',
  gap: '20px',
  marginBottom: '20px'
})

export const pendingButton = () => ({
  backgroundColor: 'white',
  color: '#4c4a54',
  boxShadow: 'none'
})

export const pendingButtonHover = () => ({
  backgroundColor: 'white',
  boxShadow: 'none'
})

export const addButton = () => ({
  backgroundColor: 'white',
  boxShadow: 'none',
  color: '#4c4a54'
})

export const addButtonHover = () => ({
  backgroundColor: 'white',
  boxShadow: 'none'
})

export const badge = () => ({
  position: 'absolute',
  top: '-8px',
  left: '193px',
  backgroundColor: '#5f76ff',
  color: 'white',
  width: '10%',
  borderRadius: '50%'
})

/* CustomerTable.css */

export const searchContainer = () => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '1.25rem',
  width: '96%'
})

export const tableHeaderCell = () => ({
  backgroundColor: '#eeeeee'
})

export const tableRow = () => ({
  backgroundColor: '#f6f5f7'
})

export const checkboxLabel = () => ({
  top: '2px',
  justifyContent: 'space-between',
  left: '-1px'
})

export const editButton = () => ({
  color: '#ffffff',
  margin: '1px',
  backgroundColor: '#3699ff',
  border: '#3699ff'
})

export const editButtonHover = () => ({
  backgroundColor: '#335de7',
  border: '#2754e6'
})

export const searchButton = () => ({
  color: '#ffffff',
  margin: '1px',
  backgroundColor: '#1dc9b7',
  border: '#1dc9b7'
})

export const searchButtonHover = () => ({
  backgroundColor: '#18a899',
  border: '#18a899'
})

export const deleteButton = () => ({
  color: '#ffffff',
  margin: '1px',
  backgroundColor: '#fd397a',
  border: '#fd397a'
})

export const deleteButtonHover = () => ({
  backgroundColor: '#fd397a',
  border: '#fd397a'
})
