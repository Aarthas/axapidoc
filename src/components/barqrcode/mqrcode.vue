<template>
  <div >
    <canvas
  :style="{height: size, width: size}"
  :height="size"
  :width="size"  ref="canvasqr"></canvas>
    <!--<img :src="imgData" v-if="type === 'img'">-->
    <!--<img src="../assets/sanjiang150.png"  style="position: relative;top: -80px;left: -60px;  width: 30px;height: 30px;">-->
  </div>
</template>

<script>
import QRCodeImpl from 'qr.js/lib/QRCode'
import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'

export default {
  props: {
    value: String,
    size: {
      type: String,
      default: "200px"
    },
    level: {
      type: String,
      default: 'L'
    },
    bgColor: {
      type: String,
      default: '#FFFFFF'
    },
    fgColor: {
      type: String,
      default: '#000000'
    },
    type: {
      type: String,
      default: 'img'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.render()
    })
  },
  data () {
    return {
      imgData: ''
    }
  },
  watch: {
    value () {
      this.render()
    },
    size () {
      this.render()
    },
    level () {
      this.render()
    },
    bgColor () {
      this.render()
    },
    fgColor () {
      this.render()
    }
  },
  methods: {
    render () {
      const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[this.level])
      qrcode.addData(this.value)
      qrcode.make()

      const canvas = this.$refs.canvasqr

      const ctx = canvas.getContext('2d')




      const cells = qrcode.modules
      const tileW =  canvas.width / cells.length
      const tileH =  canvas.width / cells.length
//      const scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx)
//      canvas.height = canvas.width = this.size * scale
//      ctx.scale(scale, scale)

      cells.forEach((row, rdx) => {
        row.forEach((cell, cdx) => {
          ctx.fillStyle = cell ? this.fgColor : this.bgColor
          const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
          const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
          ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
        })
      })

//      ctx.fillStyle="#FF0000";
//      ctx.fillRect(0,0,150,75);
//
      var beauty = new Image();
      beauty.src = "http://onpxz5rdd.bkt.clouddn.com/sanjiang150.png";
      ctx.drawImage(beauty, canvas.width/2-16, canvas.width/2-16,32,32)

//      if (this.type === 'img') {
//        this.imgData = canvas.toDataURL('image/png')
//      }
    }
  }
}


</script>
