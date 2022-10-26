import LabList from '../../components/labs/LabsList'
import '../../assets/bootstrap.css'
const Labs = () => {
  return (
    <div>
      <h3>Lab Catalog</h3>
      <p>Navigate through the available labs and request for access to any that interests you. On evaluation of your request, you will receive communication from our team on the next steps</p>
      <LabList />
    </div>
  )
}
export default Labs