(function ()
{
  if ( !exports ) var exports = window;
  var BARS = [ 212222, 222122, 222221, 121223, 121322, 131222, 122213, 122312, 132212, 221213, 221312, 231212, 112232, 122132, 122231, 113222, 123122, 123221, 223211, 221132, 221231, 213212, 223112, 312131, 311222, 321122, 321221, 312212, 322112, 322211, 212123, 212321, 232121, 111323, 131123, 131321, 112313, 132113, 132311, 211313, 231113, 231311, 112133, 112331, 132131, 113123, 113321, 133121, 313121, 211331, 231131, 213113, 213311, 213131, 311123, 311321, 331121, 312113, 312311, 332111, 314111, 221411, 431111, 111224, 111422, 121124, 121421, 141122, 141221, 112214, 112412, 122114, 122411, 142112, 142211, 241211, 221114, 413111, 241112, 134111, 111242, 121142, 121241, 114212, 124112, 124211, 411212, 421112, 421211, 212141, 214121, 412121, 111143, 111341, 131141, 114113, 114311, 411113, 411311, 113141, 114131, 311141, 411131, 211412, 211214, 211232, 23311120 ]
    , START_BASE = 38
    , STOP = 106;

  function code128( code )
  {

    var barcodeType = code128Detect( code );
    barcodeType= "C";
    //   console.log("barcodeType="+barcodeType)
    //  console.log("code="+code)
    if ( barcodeType == 'C' && code.length % 2 == 1 )
    {
      code = '0' + code;
    }
    // console.log("code="+code)

    var a = parseBarcode( code, barcodeType );
    //  console.log("a="+a)
    return a.join( '' );
  }


  function code128Detect( code )
  {
    if ( /^[0-9]+$/.test( code ) ) return 'C';
    if ( /[a-z]/.test( code ) ) return 'B';
    return 'A';
  }



  function parseBarcode( barcode, barcodeType )
  {
    let check = 0;
    let length = 0;
    var bars = [];
    bars.add = function ( nr )
    {
      var nrCode = BARS[ nr ];
      //  console.log("check="+check)
      //    console.log("nr="+nr)

       check = length == 0 ? nr : check + nr * length;
      length++;
      this.push( nrCode || ("UNDEFINED: " + nr + "->" + nrCode) );
    };
    bars.add( START_BASE + barcodeType.charCodeAt( 0 ) );
    //  console.log(" barcode.length="+ barcode.length)
    for ( var i = 0; i < barcode.length; i++ )
    {
      //  console.log(" i="+ i)
      var code = barcodeType == 'C' ? +barcode.substr( i++, 2 ) : barcode.charCodeAt( i );
      var converted = fromType[ barcodeType ]( code );
      if ( isNaN( converted ) || converted < 0 || converted > 106 ) throw new Error( "Unrecognized character (" + code + ") at position " + i + " in code '" + barcode + "'." );
      bars.add( converted );
    }
    // console.log("bars="+bars)
    // console.log("check="+check)
    // bars.push( BARS[ check % 103 ], BARS[ STOP ] );
    // console.log("bars2="+bars)

    //  console.log("bars="+bars)
    // console.log("bars.check % 103 ]="+(check % 103 ))

    bars.push( BARS[ check % 103 ] );
    bars.push( BARS[ STOP ] );
    //  console.log("bars2="+bars)

    return bars;
  }

  var fromType = {
    A: function ( charCode )
    {
      if ( charCode >= 0 && charCode < 32 ) return charCode + 64;
      if ( charCode >= 32 && charCode < 96 ) return charCode - 32;
      return charCode;
    },
    B: function ( charCode )
    {
      if ( charCode >= 32 && charCode < 128 ) return charCode - 32;
      return charCode;
    },
    C: function ( charCode )
    {
      return charCode;
    }
  };

  var createBarcode = function ( canvasId, string, cavW, cavH )
  {

    console.log("string"+string)
    var codedStr = code128( string )

    var s = codedStr;
    // console.log("codedStr"+codedStr);
    // var s = "21123212211422141121232112132222113233211114211221331113211321222233112123311120";
    var minScale = 1;
    var length = 0;
    for ( var pos = 0; pos < s.length; pos += 2 )
    {
      var w = parseInt( s.charAt( pos ) )
      var w2 = parseInt( s.charAt( pos + 1 ) )
      length = length + minScale * w + minScale * w2;
    }
    var calcScale = parseInt( cavW / length );

    const ctx = wx.createCanvasContext( canvasId )
    ctx.clearRect( 0, 0, cavW, cavW );
    ctx.setFillStyle( '#000000' )

    var scale = calcScale;
    var offset = 0 + (cavW - calcScale * length) / 2;


    console.log( "cavW=" + cavW )
    console.log( "length=" + length )
    console.log( "offset=" + offset )
    console.log( "calcScale=" + calcScale )
    for ( var pos = 0; pos < s.length; pos += 2 )
    {
      var w = parseInt( s.charAt( pos ) )
      var w2 = parseInt( s.charAt( pos + 1 ) )
      ctx.fillRect( offset, 0, scale * w, cavH )
      offset = offset + scale * w + scale * w2;
    }

    ctx.fill()
    ctx.draw()

  }

  function formatBarCode( code, space )
  {
    //12345
    var length = code.length;
    var span = 4;
    var spanCount = length % 4 == 0 ? length / span : length / span + 1; //2
    if ( spanCount > 1 )
    {
      var sb = [];
      for ( var i = 0; i < spanCount; i++ )
      {
        if ( i == spanCount - 1 )
        {
          sb.push( code.slice( i * span, length ) );
        } else
        {
          sb.push( code.slice( i * span, span * (i + 1) ) + space );
        }
      }
      return sb.join( '' );
    }
    return code;
  }

  //--| Export
  module.exports = {
    createBarcode: createBarcode,
    formatBarCode: formatBarCode,
    code128: code128
  };


})();

