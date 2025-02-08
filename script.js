document.addEventListener('DOMContentLoaded', function() {
    const inspeksiForm = document.getElementById('inspeksiForm');
    const tabelHasil = document.getElementById('tabelHasil').getElementsByTagName('tbody')[0];
    let dataInspeksi = [];

    

    inspeksiForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // step 3
        const jarak = document.getElementById('jarak').value;
        const jumlahInspektor = document.getElementById('jumlahInspektor').value;
        const jenisSertifikasi = document.getElementById('jenisSertifikasi').value;
        const inputtglBerangkat = document.getElementById('tglBerangkat').value;
        const namaPerusahaan = document.getElementById('namaPerusahaan').value;
        const jenisPerusahaan = document.getElementById('jenisPerusahaan').value;
        const jenisPekerjaan = document.getElementById('jenisPekerjaan').value;
        const pilihanAlat = Array.from(document.querySelectorAll('#pilihanAlat input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);
        const jumlahUnit = Array.from(document.querySelectorAll('#pilihanAlat input[type="number"]'))
            .map(input => input.value);

            const tglBerangkat = new Date(inputtglBerangkat); // Tanggal hari ini sebagai default
            const x = jarak / 300;
            let tambahanHari = Math.floor(x - 0.50); // Hitung tambahan hari
            // Kondisi tambahan untuk jarak 300 atau lebih besar
            if (jarak >= 300) {
                tambahanHari = Math.ceil(x - 0.50); // Pembulatan ke atas jika x >= 1
            }
            
            if (tambahanHari <= 0) {
                tambahanHari = 0; // Minimal 0 hari
            }


            // if (tambahanHari < 0) tambahanHari = 0; // Minimal 0 hari


            // // Hitung durasi tambahan
            let durasiTambahan = 0;
            let durasiAlat_pabrik = 0;
            let durasiAlat_kebun = 0;
            let durasiAlat_vessel = 0;
            let durasiAlat_psv = 0;
            function hitungDurasi(alat, durasiPerUnit) {
                const indexAlat = pilihanAlat.indexOf(alat);
            
                if (indexAlat !== -1) {
                    let durasiAlat = jumlahUnit[indexAlat] * durasiPerUnit;
                // --- Kondisi Khusus untuk Alat "K1" (dengan Modulo) ---
                    if (alat === "Lainnya (Pabrik - Industri)") {
                        const jumlahAlatK1 = jumlahUnit[indexAlat];
                        let tambahanWaktuK1 = 0;

                        // Hitung kelipatan 13
                        const kelipatan = Math.ceil((jumlahAlatK1) % 13);
                        console.log(kelipatan);

                        // Tambahan waktu berdasarkan kelipatan (dikurangi 1)
                        // if(kelipatan > 0) {
                        //     tambahanWaktuK1 = kelipatan;
                        // }
                       
                        durasiAlat_pabrik += kelipatan; // Tambahkan ke durasi
                        console.log("Durasi lainnya (pabrik):" +durasiAlat_pabrik);
                    }else if (alat === "Lainnya (Kebun - Industri)") {
                        const jumlahAlatK1 = jumlahUnit[indexAlat];
                        let tambahanWaktuK1 = 0;

                        // Hitung kelipatan 13
                        const kelipatan2 = Math.ceil((jumlahAlatK1) % 7);
                        console.log(kelipatan2);

                        // Tambahan waktu berdasarkan kelipatan (dikurangi 1)
                        // if(kelipatan > 0) {
                        //     tambahanWaktuK1 = kelipatan;
                        // }
                       
                        durasiAlat_kebun += kelipatan2; // Tambahkan ke durasi
                        console.log("Durasi lainnya (kebun):" +durasiAlat_kebun);
                    
                    }else if (alat === "Alat Vessel") {
                        const jumlahAlatK1 = jumlahUnit[indexAlat];
                        let tambahanWaktuK1 = 0;

                        // Hitung kelipatan 13
                        const kelipatan3 = Math.ceil((jumlahAlatK1) % 7);
                        console.log(kelipatan3);

                        // Tambahan waktu berdasarkan kelipatan (dikurangi 1)
                        // if(kelipatan > 0) {
                        //     tambahanWaktuK1 = kelipatan;
                        // }
                       
                        durasiAlat_vessel += kelipatan3; // Tambahkan ke durasi
                        console.log("Durasi Vessel :" +durasiAlat_vessel);
                    
                    }else if (alat === "PSV") {
                        const jumlahAlatK1 = jumlahUnit[indexAlat];
                        let tambahanWaktuK1 = 0;

                        // Hitung kelipatan 13
                        const kelipatan4 = Math.ceil((jumlahAlatK1) % 4);
                        console.log(kelipatan4);

                        // Tambahan waktu berdasarkan kelipatan (dikurangi 1)
                        // if(kelipatan > 0) {
                        //     tambahanWaktuK1 = kelipatan;
                        // }
                       
                        durasiAlat_psv += kelipatan4; // Tambahkan ke durasi
                        console.log("Durasi PSV :" +durasiAlat_psv);
                    }
                    durasiTambahan += durasiAlat+durasiAlat_pabrik+durasiAlat_kebun+durasiAlat_vessel+durasiAlat_psv;
                    console.log("durasi Tambahan Total "+durasiTambahan);
                }
                    
            }

            // Hitung durasi untuk setiap jenis alat
            hitungDurasi('Boiler', 2);       // Boiler: 2 hari per unit
            hitungDurasi('Crane Mobile', 2); // Crane Mobile: 2 hari per unit
            hitungDurasi('Kalibrasi Tangki', 1); // Kalibrasi Tangki: 1 hari per unit
            hitungDurasi('Lainnya (Pabrik - Industri)', 0.0769230769230769);      // Lainnya: 0,0769230769230769 hari per unit
            hitungDurasi('Lainnya (Kebun - Industri)', 0.1428571428571429);      // Lainnya: 0,0769230769230769 hari per unit
            
            //slo
            hitungDurasi('Genset (Kebun)', 2);    
            hitungDurasi('Genset (pabrik)', 2);    

            //migas
            hitungDurasi('Alat Tangki', 2);  
            hitungDurasi('PSV', 0.25);   
            hitungDurasi('Alat Vessel', 0.1428571428571429); 
            
            const tglPulang = new Date(tglBerangkat);
            
            if(jumlahInspektor<=1){
                durasiTambahan = (durasiTambahan-1);
                tglPulang.setDate(tglBerangkat.getDate() + tambahanHari + durasiTambahan);
                dataInspeksi.push({
                    jarak: jarak,
                    jumlahInspektor: jumlahInspektor,
                    namaPerusahaan: namaPerusahaan,
                    jenisSertifikasi: jenisSertifikasi,
                    jenisPerusahaan: jenisPerusahaan,
                    jenisPekerjaan: jenisPekerjaan,
                    pilihanAlat: pilihanAlat,
                    jumlahUnit: jumlahUnit,
                    tglBerangkat: tglBerangkat.toLocaleDateString(),
                    tglPulang: tglPulang.toLocaleDateString(),
                    tambahanHari: tambahanHari,
                    durasiTambahan: Math.round(durasiTambahan)+1
                });
            }else if(jumlahInspektor>1){
                durasiTambahan = (durasiTambahan - 1) - ((durasiTambahan - 1) / jumlahInspektor);
                // tglPulang.setDate(tglBerangkat.getDate() + tambahanHari + ((durasiTambahan-1)-((durasiTambahan-1)/jumlahInspektor)));
                tglPulang.setDate(tglBerangkat.getDate() + tambahanHari + durasiTambahan);
                dataInspeksi.push({
                    jarak: jarak,
                    jumlahInspektor: jumlahInspektor,
                    namaPerusahaan: namaPerusahaan,
                    jenisSertifikasi: jenisSertifikasi,
                    jenisPerusahaan: jenisPerusahaan,
                    jenisPekerjaan: jenisPekerjaan,
                    pilihanAlat: pilihanAlat,
                    jumlahUnit: jumlahUnit,
                    tglBerangkat: tglBerangkat.toLocaleDateString(),
                    tglPulang: tglPulang.toLocaleDateString(),
                    tambahanHari: tambahanHari,
                    durasiTambahan: Math.round(durasiTambahan)
                });
            }
            
            //step 4

        // dataInspeksi.push({
        //     jarak: jarak,
        //     jumlahInspektor: jumlahInspektor,
        //     namaPerusahaan: namaPerusahaan,
        //     jenisSertifikasi: jenisSertifikasi,
        //     jumlahHelper: jumlahHelper,
        //     jenisPerusahaan: jenisPerusahaan,
        //     jenisPekerjaan: jenisPekerjaan,
        //     pilihanAlat: pilihanAlat,
        //     jumlahUnit: jumlahUnit,
        //     tglBerangkat: tglBerangkat.toLocaleDateString(),
        //     tglPulang: tglPulang.toLocaleDateString(),
        //     tambahanHari: tambahanHari,
        //     durasiTambahan: Math.round(durasiTambahan)+1
        // });

        tampilkanData();
        inspeksiForm.reset();
        resetPilihanAlat(); // Reset pilihan alat dan input jumlah unit
    });

   
    function tampilkanData() {
        tabelHasil.innerHTML = '';        
        // step 5
        dataInspeksi.forEach(item => {
            const row = tabelHasil.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell4 = row.insertCell(); // Tambahkan cell baru untuk namaPerusahaan
            const cell5 = row.insertCell(); // Tambahkan cell baru untuk jenisSertifikasi
            const cell6 = row.insertCell();
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
            cell5.textContent = item.jenisSertifikasi
            cell6.textContent = item.jenisPerusahaan;
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
            
            const jenisPerusahaan = document.getElementById('jenisPerusahaan').value;
            const jenisPekerjaan = document.getElementById('jenisPekerjaan').value;
            const pilihanAlatDiv = document.getElementById('pilihanAlat');
            pilihanAlatDiv.innerHTML = ''; // Kosongkan pilihan alat sebelumnya
            pilihanAlatDiv.style.display = 'none'; // Sembunyikan sampai ada pilihan

            if (jenisPerusahaan === 'Pabrik') {
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
                    const industriOptions = ['Boiler', 'Crane Mobile', 'Kalibrasi Tangki','Lainnya (Pabrik - Industri)'];
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
                    const gensetOptions = ['Genset (pabrik)'];
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
            } else if (jenisPerusahaan === 'Kebun'){
                if (jenisPekerjaan === 'Industri') {
                    const industriOptions = ['Boiler', 'Crane Mobile', 'Kalibrasi Tangki','Lainnya (Kebun - Industri)'];
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
                    const gensetOptions = ['Genset (Kebun)'];
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
                } 
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