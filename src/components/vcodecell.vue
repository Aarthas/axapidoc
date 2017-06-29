<template>

  <div class="vux-x-input weui-cell" >
    <div class="weui-cell__hd">
      <label class="weui-label"  :style="{width: $parent.labelWidth || (labelWidth + 'em')}" v-if="title"
             v-html="title"></label>
    </div>
    <div class="weui-cell__bd">
      <input class="weui-input"  :placeholder=placeholder v-bind:value="value" v-on:input="updateValue($event.target.value)"  ref="input">
    </div>
    <div class="weui-cell__ft">
      <button class="weui-vcode-btna" @click="$emit('startCount', 'a')" v-html="buttonText" :disabled="disabled">获取验证码</button>
    </div>
  </div>

</template>

<script>


  var that;

  export default {

    data () {
      return {
        currentIndex: 0,

        disabled: false,
        currentText: ""
      };
    },


    props: {
      vcodeLabel: {
        type: String,
        default: '获取验证码'
      },

      placeholder: {
        type: String,
        default: '请输入手机号'
      },
      title: {
        type: String,
        default: ''
      },
      value: [ String, Number ],

      max: {
        type: Number,
        default: 5
      },
      startFunction: {
        type: Function,

      },

    },
    computed: {

      labelWidth () {
        return this.title.replace( /[^x00-xff]/g, '00' ).length / 2 + 1
      },
      buttonText() {
        if (that.currentText == null||that.currentText == ""){
            return that.vcodeLabel;
        }else {
          return that.currentText
        }

      },

    },

    created () {
      that = this;
      console.log("created")
    },
    mounted(){
      console.log("mounted")
    },
    activated(){
      console.log("activated")
    },
    deactivated(){
      console.log("deactivated")
    },
    destroyed(){
      console.log("destroyed")
    },
    methods: {

      start: function ()
      {
        if ( that.disabled )
        {
          return;
        }
        that.currentIndex = that.max;
        that.currentText = "" + that.currentIndex;
        that.disabled = true;

        console.log( "start" );
        that.st = setInterval( function ()
        {
          that.currentIndex--;
          that.currentText = "" + that.currentIndex;

          if ( that.currentIndex <= 0 )
          {
            clearTimeout( that.st );
            that.disabled = false;
            that.currentText = "";
          }
        }, 1000 );


      },
      sendCode: function ()
      {
        console.log( "sendCode" );

        that.start();
      },

      updateValue: function ( value )
      {

        this.$emit( 'input',value);

      }


    }
  }
</script>

<style >



  .weui-vcode-btna {
    display: inline-block;
    width: 120px;
    height: 24px;
    margin-left: 5px;
    padding: 0 5px 0 5px;
    border-left: 1px solid #E5E5E5;
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    line-height: 24px;
    vertical-align: middle;
    font-size: 15px;
    color: #3CC51F;
    background-color: transparent;

    outline: 0;
  }

  .weui-vcode-btna:active {
    color: #52a341;
  }

  .weui-vcode-btna:disabled {
    color: #999999;
  }

  .vux-input-icon.vux-input-icon {
    font-size: 21px;
  }
  .vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before {
    font-size: 21px;
  }
  .vux-x-input .weui-icon {
    padding-left: 5px;
  }
  .vux-x-input.weui-cell_vcode {
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
  }
</style>
