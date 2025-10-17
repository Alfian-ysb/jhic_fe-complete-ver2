import Navbar  from '../components/navbar'
// import Title from '../components/tiltle'
import StrukturOrganisasi from '../assets/img/strukturorganisasi.jpg'

const strukturOrganisasi = () => {
  return (
    <div>
        <Navbar />
        <div className='px-100'>
          {/* <Title text="Struktur Organisasi" /> */}
          <img src={StrukturOrganisasi} alt="Struktur Organisasi" />
        </div>  
    </div>
  )
}

export default strukturOrganisasi