document.addEventListener('DOMContentLoaded', function () {
    const inspeksiForm = document.getElementById('inspeksiForm');
    const tabelHasil = document.getElementById('tabelHasil').getElementsByTagName('tbody')[0];
    let dataInspeksi =[];

    inspeksiForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const jarak = parseFloat(document.getElementById('jarak').value); // Ubah ke angka
        const jumlahInspektor = parseInt(document.getElementById('jumlahInspektor').value); // Ubah ke angka
        // const jenisSertifikasi = document.getElementById('jenisSertifikasi').value;
        const inputtglBerangkat = document.getElementById('tglBerangkat').value;
        const namaPerusahaan = document.getElementById('namaPerusahaan').value;
        // const jenisPerusahaan = document.getElementById('jenisPerusahaan').value;
        const jenisPekerjaan = document.getElementById('jenisPekerjaan').value;
        const pilihanAlat = Array.from(document.querySelectorAll('#pilihanAlat input[type="checkbox"]:checked'))
          .map(checkbox => checkbox.value);
        const jumlahUnit = Array.from(document.querySelectorAll('#pilihanAlat input[type="number"]'))
          .map(input => parseInt(input.value)); // Ubah ke angka

        const tglBerangkat = new Date(inputtglBerangkat);
        const x = jarak / 300;
        let tambahanHari = Math.floor(x - 0.50);
        if (jarak >= 300) {
            tambahanHari = Math.ceil(x - 0.50);
        }
        if (tambahanHari <= 0) {
            tambahanHari = 0;
        }

        let durasiTambahan = 0;
        function hitungDurasi(alat, durasiPerUnit) {
            const indexAlat = pilihanAlat.indexOf(alat);
            if (indexAlat!== -1) {
                let durasiAlat = 0;
                if (alat === "Lainnya (Pabrik - Industri)") {
                    let jumlahUnitPabrik = jumlahUnit[indexAlat];
                    
                    if (jumlahUnitPabrik >= 0 && jumlahUnitPabrik < 13) {
                        jumlahUnitPabrik = 13;
                    }
                    const x = jumlahUnitPabrik * 0.0769230769;
                    durasiAlat += Math.ceil(x - 0.50);
         
                }if (alat === "Lainnya (Kebun - Industri)") {
                    let jumlahUnitKebun = jumlahUnit[indexAlat];
                    
                    if (jumlahUnitKebun >= 0 && jumlahUnitKebun < 7) {
                        jumlahUnitKebun = 7;
                    }
                    const x = jumlahUnitKebun * 0.14285714285;
                    durasiAlat = Math.ceil(x - 0.50);
                } 
                if (alat === "Alat Vessel") {
                    let jumlahAlatVessel = jumlahUnit[indexAlat];
                    
                    if (jumlahAlatVessel >= 0 && jumlahAlatVessel < 7) {
                        jumlahAlatVessel = 7;
                    }
                    const x = jumlahAlatVessel * 0.14285714285;
                    durasiAlat = Math.ceil(x - 0.50);
                } 
                if (alat === "PSV") {
                    let jumlahPSV = jumlahUnit[indexAlat];
                    
                    if (jumlahPSV >= 0 && jumlahPSV < 4) {
                        jumlahPSV = 4;
                    }

                    const x = jumlahPSV * 0.25;
                    durasiAlat = Math.ceil(x - 0.50);
                }
                if (alat!== "Lainnya (Pabrik - Industri)" && alat!== "Lainnya (Kebun - Industri)" && alat!== "Alat Vessel" && alat!== "PSV") {
                    durasiAlat = jumlahUnit[indexAlat] * durasiPerUnit;
                }
                durasiTambahan += durasiAlat; // Bulatkan ke atas untuk setiap alat
            }
        }

        // Perhitungan durasi sesuai ketentuan
        hitungDurasi('Boiler', 2);
        hitungDurasi('Crane Mobile', 2);
        hitungDurasi('Kalibrasi Tangki', 1);
        hitungDurasi('Genset', 2);
        hitungDurasi('PSV', 1 / 4); // 1 hari / 4 unit 0.25
        hitungDurasi('Alat Tangki', 2); // 2 hari / 1 unit
        hitungDurasi('Alat Vessel', 1 / 7); // 1 hari / 7 unit 0.14285714285
        hitungDurasi('Lainnya (Pabrik - Industri)', 1 / 13); // 1 hari / 13 unit
        hitungDurasi('Lainnya (Kebun - Industri)', 1 / 7); // 1 hari / 7 unit

        if (jumlahInspektor > 1) {
            durasiTambahan = Math.ceil(durasiTambahan / jumlahInspektor); // Bagi durasi dan bulatkan ke atas
        }
        
        const tglPulang = new Date(tglBerangkat);
        tglPulang.setDate(tglBerangkat.getDate() + tambahanHari + (durasiTambahan-1));

        dataInspeksi.push({
            jarak: jarak,
                    jumlahInspektor: jumlahInspektor,
                    namaPerusahaan: namaPerusahaan,
                    // jenisSertifikasi: jenisSertifikasi,
                    // jenisPerusahaan: jenisPerusahaan,
                    jenisPekerjaan: jenisPekerjaan,
                    pilihanAlat: pilihanAlat,
                    jumlahUnit: jumlahUnit,
            tglBerangkat: tglBerangkat.toLocaleDateString(),
            tglPulang: tglPulang.toLocaleDateString(),
            tambahanHari: tambahanHari,
            durasiTambahan: Math.round(durasiTambahan) // Bulatkan durasi total
        });

        tampilkanData();
        inspeksiForm.reset();
        resetPilihanAlat();
    });

    function tampilkanData() {
        tabelHasil.innerHTML = '';        
        // step 5
        dataInspeksi.forEach(item => {
            const row = tabelHasil.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell4 = row.insertCell(); // Tambahkan cell baru untuk namaPerusahaan
            // const cell5 = row.insertCell(); // Tambahkan cell baru untuk jenisSertifikasi
            // const cell6 = row.insertCell();
            const cell7 = row.insertCell();
            const cell8 = row.insertCell();
            const cell9 = row.insertCell();
            const cell10 = row.insertCell();
            const cell11 = row.insertCell();
            const cell12 = row.insertCell();
            const cell13 = row.insertCell();


            // step 6
            cell1.textContent = item.jarak;
            cell2.textContent = item.jumlahInspektor;
            cell4.textContent = item.namaPerusahaan;
            // cell5.textContent = item.jenisSertifikasi
            // cell6.textContent = item.jenisPerusahaan;
            cell7.textContent = item.jenisPekerjaan;
            cell8.textContent = item.pilihanAlat.join(', '); // Menampilkan pilihan alat sebagai string
            cell9.textContent = item.jumlahUnit.join(', '); // Menampilkan jumlah unit sebagai string
            cell10.textContent = item.tglBerangkat; // Tanggal Berangkat
            cell11.textContent = item.tglPulang; // Tanggal Pulang
            cell12.textContent = item.tambahanHari; // Tanggal Pulang
            cell13.textContent = item.durasiTambahan; // Tanggal Pulang
        });

        
    }

        window.tampilkanPilihanAlat = function() {
            
            // const jenisPerusahaan = document.getElementById('jenisPerusahaan').value;
            const jenisPekerjaan = document.getElementById('jenisPekerjaan').value;
            const pilihanAlatDiv = document.getElementById('pilihanAlat');
            pilihanAlatDiv.innerHTML = ''; // Kosongkan pilihan alat sebelumnya
            pilihanAlatDiv.style.display = 'none'; // Sembunyikan sampai ada pilihan

           
                if (jenisPekerjaan === 'Migas') {
                    const migasOptions = ['PSV', 'Alat Tangki', 'Alat Vessel'];
                    migasOptions.forEach(option => {
                        const div = document.createElement('div'); // Bungkus checkbox dan input dalam div

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.id = option;
                        checkbox.name = 'pilihanAlat';
                        checkbox.value = option;
                        checkbox.addEventListener('change', tampilkanInputJumlahUnit); // Tambahkan event listener

                        const label = document.createElement('label');
                        label.htmlFor = option;
                        label.textContent = option;

                        div.appendChild(checkbox);
                        div.appendChild(label);
                        pilihanAlatDiv.appendChild(div);
                    });

                    pilihanAlatDiv.style.display = 'block';
                } else if (jenisPekerjaan === 'Industri') {
                    const industriOptions = ['Boiler', 'Crane Mobile', 'Kalibrasi Tangki','Lainnya (Pabrik - Industri)','Lainnya (Kebun - Industri)'];
                    industriOptions.forEach(option => {
                        const div = document.createElement('div');
            
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.id = option;
                        checkbox.name = 'pilihanAlat';
                        checkbox.value = option;
                        checkbox.addEventListener('change', tampilkanInputJumlahUnit);
            
                        const label = document.createElement('label');
                        label.htmlFor = option;
                        label.textContent = option;
            
                        div.appendChild(checkbox);
                        div.appendChild(label);
                        pilihanAlatDiv.appendChild(div);
                    });
            
                    pilihanAlatDiv.style.display = 'block';
                }  else if (jenisPekerjaan === 'SLO') {
                    const gensetOptions = ['Genset'];
                    gensetOptions.forEach(option => {
                        const div = document.createElement('div');
            
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.id = option;
                        checkbox.name = 'pilihanAlat';
                        checkbox.value = option;
                        checkbox.addEventListener('change', tampilkanInputJumlahUnit);
            
                        const label = document.createElement('label');
                        label.htmlFor = option;
                        label.textContent = option;
            
                        div.appendChild(checkbox);
                        div.appendChild(label);
                        pilihanAlatDiv.appendChild(div);
                    });
            
                    pilihanAlatDiv.style.display = 'block';
                } else if (jenisPekerjaan === 'Marine') {
                    const marineOptions = ['Kapal Tugboat', 'Kapal Tongkang', 'Kapal Cargo,Tangker,sejenisnya'];
                    marineOptions.forEach(option => {
                        const div = document.createElement('div');
            
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.id = option;
                        checkbox.name = 'pilihanAlat';
                        checkbox.value = option;
                        checkbox.addEventListener('change', tampilkanInputJumlahUnit);
            
                        const label = document.createElement('label');
                        label.htmlFor = option;
                        label.textContent = option;
            
                        div.appendChild(checkbox);
                        div.appendChild(label);
                        pilihanAlatDiv.appendChild(div);
                    });
            
                    pilihanAlatDiv.style.display = 'block';// Tambahkan pilihan alat marine di sini jika diperlukan
                }   
        }

    function tampilkanInputJumlahUnit() {
        const pilihanAlatDiv = document.getElementById('pilihanAlat');
        const checkedCheckboxes = pilihanAlatDiv.querySelectorAll('input[type="checkbox"]:checked');
        const jumlahUnitInputs = pilihanAlatDiv.querySelectorAll('input[type="number"]');
      
        // Sembunyikan semua input jumlah unit
        jumlahUnitInputs.forEach(input => input.style.display = 'none');
      
        // Tampilkan input jumlah unit yang sesuai dengan checkbox yang dicentang
        checkedCheckboxes.forEach((checkbox, index) => {
          // Cari div yang berisi checkbox ini
          const parentDiv = checkbox.parentNode;
      
          // Cari input number di dalam div tersebut
          let jumlahUnitInput = parentDiv.querySelector('input[type="number"]');
      
          // Jika input number belum ada, buat baru
          if (!jumlahUnitInput) {
            jumlahUnitInput = document.createElement('input');
            jumlahUnitInput.type = 'number';
            jumlahUnitInput.name = 'jumlahUnit';
            jumlahUnitInput.placeholder = 'Jumlah Unit';
            jumlahUnitInput.value = 0;  
            parentDiv.appendChild(jumlahUnitInput);
          }
      
          // Tampilkan input number
          jumlahUnitInput.style.display = 'inline-block'; // atau 'block'
        });
      }

    function resetPilihanAlat() {
        const pilihanAlatDiv = document.getElementById('pilihanAlat');
        pilihanAlatDiv.style.display = 'none';
        pilihanAlatDiv.innerHTML = '';
    }
    
});
