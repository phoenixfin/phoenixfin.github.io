<p align="center">
    <h2 align="center">Bacalah yang tak terbaca - PHX</h2>
</p>

## Tautan pendek (short links)

Setiap berkas di dalam `s/` adalah satu tautan pendek. Isinya hanya front matter:

```yaml
---
redirect_to: https://contoh.com/alamat/yang/sangat/panjang
---
```

Berkas `s/gh.md` menjadi `https://phx.my.id/s/gh`. Nama berkas adalah kodenya,
jadi gunakan huruf kecil tanpa spasi. Awalan `/s/` menjaga agar kode tautan tidak
pernah bentrok dengan permalink tulisan (`/:title/`).

Semua stub di `s/` otomatis dikecualikan dari `sitemap.xml` lewat `defaults` di
`_config.yml`, dan `robots.txt` melarang perayapan `/s/`.

Catatan: GitHub Pages hanya menyajikan berkas statis, sehingga pengalihan ini
berupa `<meta http-equiv="refresh">` dan bukan `301` sungguhan. Cukup untuk
tautan pribadi, tetapi pratinjau tautan di aplikasi pesan bisa tidak mengikuti.
