const resi = document.getElementById('resi')
const submit = document.getElementById('submit')
const optionValues = document.querySelectorAll('option')
const apiKey = '621e426e1c9bd2271c4c6d2f5f5bc6f2a27318c40d33db05925514e9e9b1c1c1'
const listKurirs = document.getElementById('listKurir')
const result = document.getElementById('result')
const tds = document.querySelectorAll('#result table tr')
const informasi = document.querySelector('.container p')



const getListCourier = async () => {
  const response = await fetch(`https://api.binderbyte.com/v1/list_courier?api_key=${apiKey}`)
  const datas = await response.json()
  for (data of datas) {
    const option = document.createElement('option')
    option.innerHTML = data.code.toUpperCase()
    listKurirs.appendChild(option)
  }
  
  let Kurir = ''
  listKurirs.addEventListener('change', () => {
    Kurir = listKurirs.value
  })
  
  submit.addEventListener('click', async () => {
    const response1 = await fetch(`https://api.binderbyte.com/v1/track?api_key=${apiKey}&courier=${Kurir}&awb=${resi.value}`)
    const datas1 = await response1.json()
    if (datas1.status === 200) {
    informasi.style.display = 'none'
    result.style.display = 'block'
    const status = document.getElementById('status')
    const layanan = document.getElementById('layanan')
    const pengirim = document.getElementById('pengirim')
    const asal = document.getElementById('asal')
    const penerima = document.getElementById('penerima')
    const tujuan = document.getElementById('tujuan')
    status.innerHTML = datas1.data.summary.status
    layanan.innerHTML = datas1.data.summary.courier
    pengirim.innerHTML = datas1.data.detail.shipper
    asal.innerHTML = datas1.data.detail.origin
    penerima.innerHTML = datas1.data.detail.receiver
    tujuan.innerHTML = datas1.data.detail.destination
    }
    else {
      informasi.style.display = 'block'
      result.style.display = 'none'
      informasi.style.margin = '50px 10px 14px 14px'
      informasi.innerHTML = `400 ${datas1.message}`
    }
  })
  
}

getListCourier()