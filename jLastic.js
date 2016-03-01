// Copyright (c) 2013 Robert G Nicu
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function( $ ) {
	// Local Globals
	var settings = {} ;
	var absoluteTileW ,
		absoluteTileH ,
		rowWidth	  ,
		columnHeight	  ;
	var tilesToLeft	 ,
		tilesToRight ,
		tilesAbove	 ,
		tilesBelow	 ,
		tilesPerColumn;
	var leftHorizontallExpand ,
		rightHorizontalExpand ,
		topVerticalExpand	  ,
		bottomVerticalExpand  ;
	var nml ,
		nmt ,
		ctw ,
		cth ;
	var animatedTiles = [] ;
 
 
    // Plugin definition.
    $.fn.jLastic = function( options ) {
        
        settings = $.extend({
            // The defaults.
            mode: "image" ,
            tilesPerRow: 5	,
            tileWidth:	 100,
            tileHeight:  100,
            tileMargin:	 10	,
            portraitExpandWidth:	220 ,
            portraitExpandHeight:	320 ,
            landscapeExpandWidth:	330 ,
            landscapeExpandHeight:	220 ,
            animationDurationExpand:	300 ,
            animationDurationCompress:	300 ,
            event: "default"
        }, options ) ;
		absoluteTileW = settings.tileWidth  + settings.tileMargin ;
		absoluteTileH = settings.tileHeight + settings.tileMargin ;
		rowWidth = settings.tilesPerRow * absoluteTileW  ;
		
    	$(this).each(function () {
			if( settings.event == "click" ){ createClickEvents(this) ; } else{ createHoverEvents(this) ; }
			if ( settings.mode == "image" ){ 
				setJflexDimensions(this);
				createTiles(this) ; 
			} 
			else{ 
				setJflexDimensionsNonImage(this);
				createTilesNonImage(this) ; 
			}
			positionTiles(this)		;
			wrapWithDiv(this)		;
			setCssProperties(this)	;
		}) ;
		return this ;
    } ;

	var canAniateElementsBack = false ;
	// Execute once at load.
    function createHoverEvents( jlastic ){
    	$(jlastic).on("mouseout", ".tile", function(){
    		canAniateElementsBack = true ;
			setTimeout(								// Set timeout.
				function() 							//
				{									//
					if(canAniateElementsBack) {		//
						animateTilesBack( this ) ;//
					}								//	This line executes after the time in milliseconds
				}, 150);							//
		}).on("mouseover", ".tile", function(){
			canAniateElementsBack = false ;
			updatePrerequisites( this ) ;
			animateTiles( this ) ;
		}) ;
    }
    function createClickEvents( jlastic ){
    	$( jlastic ).on("click", ".tile", function(){
    		animateTilesBack( this ) ;
    		if( $(this).hasClass("clicked") ){
    			$(this).removeClass("clicked") ;
			}else{
				$( jlastic).find(".tile").removeClass("clicked") ;
				$(this).addClass("clicked") ;
				updatePrerequisites( this ) ;
				animateTiles( this ) ;			
			}
		}) ;
    }
	function setJflexDimensions( jFlex ){		
		var jFlexW = rowWidth +'px' ;
		var jFlexH = ( Math.ceil( $(jFlex).children('img').length / settings.tilesPerRow ) * absoluteTileH )+'px' ;
		$(jFlex).css({'width': jFlexW, 'height': jFlexH }) ;
	}
	function setJflexDimensionsNonImage( jFlex ){
		var jFlexW = rowWidth +'px' ;
		var jFlexH = ( Math.ceil( $(jFlex).children('span').length / settings.tilesPerRow ) * absoluteTileH )+'px' ;
		$(jFlex).css({'width': jFlexW, 'height': jFlexH }) ;
	}
	function createTiles( jFlex ){
		var imageURL ;
		$(jFlex).children('img').each(function () {
			imageURL = $(this).attr('src') ;
			$(this).wrap('<div />') ;
			$(this).parent().css('background-image', 'url(' + imageURL + ')') ;
			$(this).parent().addClass("tile") ;
			if($(this).attr('mode') == "portrait"){$(this).parent().attr("mode", "portrait") ; }
			$(this).hide() ;//hide the image element.
		});
	}
	function createTilesNonImage( jFlex ) {
		var imageURL ;
		$(jFlex).children().each(function () {
			imageURL = $(this).attr('src') ;
			$(this).wrap('<div />') ;
			$(this).parent().css('background-image', 'url(' + imageURL + ')') ;
			$(this).parent().css('overflow','hidden');
			$(this).parent().addClass("tile") ;
			if($(this).attr('mode') == "portrait"){$(this).parent().attr("mode", "portrait") ; }
		});		
	}
	function positionTiles( jFlex ){
		var left = 0; var top = 0 ;
		var rw = rowWidth - absoluteTileW ;

		$(jFlex).children(".tile").each(function () {
			$(this).css({'top': top+'px', 'left': left+'px'}) ;
			$(this).attr({'tp': top, "lft": left}) ;// Add attribute+val to element.
			if(left == rw){
				left = 0;top += absoluteTileH ;
			}
			else{
				left += absoluteTileW ;
			}
		});
	}
	function wrapWithDiv( jFlex ){
		var jFlexChildren = $(jFlex).children(".tile") ;
		
		for(var i=0; i<jFlexChildren.length; i += settings.tilesPerRow){
			jFlexChildren.slice( i, i+settings.tilesPerRow ).wrapAll("<div class='row' />") ;
		}
	}
	function setCssProperties( jFlex ){
		$(jFlex).find(".tile").width ( settings.tileWidth  ) ;
		$(jFlex).find(".tile").height( settings.tileHeight ) ;
	}

	// Expand, animation.
	function animateTiles( hoveredTile ){
		var ew = findExpandWidth( hoveredTile )  ;
			ew += settings.tileWidth  ;
		var eh = findExpandHeight( hoveredTile ) ;
			eh += settings.tileHeight ;
			
		// Animate hovered tile.
		$( hoveredTile ).stop(true).animate({
			width:  ew +"px",
			height: eh +"px",
			top:   nmt +"px",
			left:  nml +"px"
		}, settings.animationDurationExpand) ;
		animatedTiles.push( hoveredTile ) ;

		animateTilesAboveAndBelow( hoveredTile ) ;
		animateTilesLeftAndRight ( hoveredTile ) ;
	}
	function animateTilesAboveAndBelow( hoveredTile ){//Dreadful method
		var hoveredTileGrandparent = $( hoveredTile ).parent().parent() ;
		var hoveredTileIndex  = $( hoveredTile ).index() ;
		var hoveredTileParentIndex = $( hoveredTile ).parent().index() ;

		var indexYA = hoveredTileParentIndex - leftHorizontalExpand ;
		var indexYB = hoveredTileParentIndex + leftHorizontalExpand ;
		var indexX = hoveredTileIndex - leftHorizontalExpand  ;
		
		var tileA, tileB, lft, ctha, cthb, firstTileAbovePosition, firstTileBelowPosition ;
		
		--indexX;
		--indexYA;
		++indexYB;
		
		// top and bottom left-tiles.
		for( var i=0; i< leftHorizontalExpand; i++ ){
			++indexX ;
			
			// top-left tiles.
			++indexYA ;			
			ctha = compressedTileHeightAbove( hoveredTile, indexYA ) ;
			if( ctha != null ){
				firstTileAbovePosition = ( nmt - ctha ) - settings.tileMargin ;
				for(var ya=indexYA; ya >=0; ya--){
					tileA = $( hoveredTileGrandparent ).children().eq( ya ).children().eq( indexX );
					lft = $( tileA ).attr("lft") ;
					tileA.stop( true ).animate({
						width:  settings.tileWidth +"px",
						height: ctha +"px",
						top:    firstTileAbovePosition +"px",
						left:   lft +"px"
					}, settings.animationDurationExpand) ;
					firstTileAbovePosition -= ctha ;
					firstTileAbovePosition -= settings.tileMargin  ;
					animatedTiles.push( tileA ) ;
				}
			}
			
			// bottom-left tiles.
			--indexYB ;
			cthb = compressedTileHeightBelow( hoveredTile, indexYB ) ;
			if( cthb != null ){
				firstTileBelowPosition = firstCompressedTileLocationBelow( hoveredTile ) ;
				for( var yb= indexYB; yb <tilesPerColumn; yb++ ){
					tileB = $( hoveredTileGrandparent ).children().eq( yb ).children().eq( indexX ) ;
					lft = $( tileB ).attr("lft") ;
					tileB.stop( true ).animate({
						width:  settings.tileWidth +"px",
						height: cthb +"px",
						top:    firstTileBelowPosition +"px",
						left:   lft +"px"
					}, settings.animationDurationExpand) ;
					firstTileBelowPosition += cthb ;
					firstTileBelowPosition += settings.tileMargin  ;
					animatedTiles.push( tileB ) ;
				}
			}
		}
		for( var j=0; j<= rightHorizontalExpand; j++ ){	
			++indexX ;

			// top-right tiles + directly above tiles.
			ctha = compressedTileHeightAbove( hoveredTile, indexYA ) ;
			if( ctha != null ){
				firstTileAbovePosition = ( nmt - ctha ) - settings.tileMargin ;
				for(var ya=indexYA; ya >=0; ya--){
					tileA = $( hoveredTileGrandparent ).children().eq( ya ).children().eq( indexX );
					lft = $( tileA ).attr("lft") ;
					tileA.stop( true ).animate({
						width:  settings.tileWidth +"px",
						height: ctha +"px",
						top:    firstTileAbovePosition +"px",
						left:   lft +"px"
					}, settings.animationDurationExpand) ;
					firstTileAbovePosition -= ctha ;
					firstTileAbovePosition -= settings.tileMargin  ;
					animatedTiles.push( tileA ) ;
				}
			}
			
			// bottom-right tiles + directly below tiles.
			cthb = compressedTileHeightBelow( hoveredTile, indexYB ) ;
			if( cthb != null ){
				firstTileBelowPosition = firstCompressedTileLocationBelow( hoveredTile ) ;
				for( var yb= indexYB; yb <tilesPerColumn; yb++ ){
					tileB = $( hoveredTileGrandparent ).children().eq( yb ).children().eq( indexX ) ;
					lft = $( tileB ).attr("lft") ;
					tileB.stop( true ).animate({
						width:  settings.tileWidth +"px",
						height: cthb +"px",
						top:    firstTileBelowPosition +"px",
						left:   lft +"px"
					}, settings.animationDurationExpand) ;
					firstTileBelowPosition += cthb ;
					firstTileBelowPosition += settings.tileMargin ;
					animatedTiles.push( tileB ) ;
				}
			}		
			if(j != 0){ --indexYA;  ++indexYB ;}
		}
	}
	// Animate tile Left and Right
	function animateTilesLeftAndRight( hoveredTile ){
		var hoveredTileGrandparent = $( hoveredTile ).parent().parent() ;
		var hoveredTileIndex  = $( hoveredTile ).index() ;
		var hoveredTileParentIndex = $( hoveredTile ).parent().index() ;

		var indexY = hoveredTileParentIndex ;
		var indexXL = hoveredTileIndex ;
		var indexXR = hoveredTileIndex ;
		var tileA, tileB, tp, ctwl, ctwr, firstTileLeftPosition, firstTileRightPosition ;
		


		--indexXL;
		++indexXR;
		// left and right top-tiles.
		for( var i=0; i< topVerticalExpand; i++ ){
			--indexY ;	
				
			// left top tiles
			--indexXL;
			ctwl = compressedTileWidthLeft( hoveredTile, indexXL ) ;
			if( ctwl != null ){
 				firstTileLeftPosition = ( nml - ctwl ) - settings.tileMargin ;
				for(var xl= indexXL; xl >=0; xl--){
					tileL = $( hoveredTileGrandparent ).children().eq( indexY ).children().eq( xl ) ;
					tp = $( tileL ).attr("tp") ;
					tileL.stop( true ).animate({
						width:  ctwl+"px",
						height: settings.tileHeight +"px",
						top:    tp +"px",
						left:   firstTileLeftPosition +"px"
					}, settings.animationDurationExpand) ;
					firstTileLeftPosition -= ctwl ;
					firstTileLeftPosition -= settings.tileMargin ;
					animatedTiles.push( tileL ) ;
				}
			}
			
			// right top tiles
			++indexXR;
			ctwr = compressedTileWidthRight( hoveredTile, indexXR ) ;
			if( ctwr != null ){
				firstTileRightPosition = firstCompressedTileLocationRight( hoveredTile ) ;
				for( var xr= indexXR; xr <settings.tilesPerRow; xr++ ){
					tileR = $( hoveredTileGrandparent ).children().eq( indexY ).children().eq( xr ) ;
					tp = $( tileR ).attr("tp") ;
					tileR.stop( true ).animate({
						width:  ctwr +"px",
						height: settings.tileHeight +"px",
						top:    tp +"px",
						left:   firstTileRightPosition +"px"
					}, settings.animationDurationExpand) ;
					firstTileRightPosition += ctwr ;
					firstTileRightPosition += settings.tileMargin ;
					animatedTiles.push( tileR ) ;
				}
			}
		}
		//reset variables
		indexY = hoveredTileParentIndex ;
		indexXL = hoveredTileIndex ;
		indexXR = hoveredTileIndex ;
		
		--indexY;
		// left and right bottom-tiles
		for( var j=0; j<= bottomVerticalExpand; j++ ){	
			++indexY ;	
				
			// left bottom tiles + directly right
			--indexXL;
			ctwl = compressedTileWidthLeft( hoveredTile, indexXL ) ;
			if( ctwl != null ){
 				firstTileLeftPosition = ( nml - ctwl ) - settings.tileMargin ;
				for(var xl= indexXL; xl >=0; xl--){
					tileL = $( hoveredTileGrandparent ).children().eq( indexY ).children().eq( xl ) ;
					tp = $( tileL ).attr("tp") ;
					tileL.stop( true ).animate({
						width:  ctwl+"px",
						height: settings.tileHeight +"px",
						top:    tp +"px",
						left:   firstTileLeftPosition +"px"
					}, settings.animationDurationExpand) ;
					firstTileLeftPosition -= ctwl ;
					firstTileLeftPosition -= settings.tileMargin ;
					animatedTiles.push( tileL ) ;
				}
			}
			
			// right bottom tiles + directly right tiles
			++indexXR;
			ctwr = compressedTileWidthRight( hoveredTile, indexXR ) ;
			if( ctwr != null ){
				firstTileRightPosition = firstCompressedTileLocationRight( hoveredTile ) ;
				for( var xr= indexXR; xr <settings.tilesPerRow; xr++ ){
					tileR = $( hoveredTileGrandparent ).children().eq( indexY ).children().eq( xr ) ;
					tp = $( tileR ).attr("tp") ;
					tileR.stop( true ).animate({
						width:  ctwr +"px",
						height: settings.tileHeight +"px",
						top:    tp +"px",
						left:   firstTileRightPosition +"px"
					}, settings.animationDurationExpand) ;
					firstTileRightPosition += ctwr ;
					firstTileRightPosition += settings.tileMargin ;
					animatedTiles.push( tileR ) ;
				}
			}
		}
	}

	// Compress, animation.
	function animateTilesBack( hoveredTile ){
		var originalTileMarginTop  ;
		var originalTileMarginLeft ;
	
		for(var i=0; i< animatedTiles.length; i++){
			originalTileMarginTop  = $( animatedTiles[i] ).attr("tp")   ;
			originalTileMarginLeft = $( animatedTiles[i] ).attr("lft")  ;
			$(animatedTiles[i]).stop(true).animate({
				width:  settings.tileWidth   +"px",
				height: settings.tileHeight  +"px",
				top:  originalTileMarginTop	 +"px",
				left: originalTileMarginLeft +"px"
			}, settings.animationDurationCompress ) ;			
		}
		animatedTiles.length = 0;
	}

	//Helper methods.
	function updatePrerequisites( hoveredTile ){
		tilesToRight = $(hoveredTile).nextAll().length ;				
		tilesToLeft  = $(hoveredTile).prevAll().length ;
		tilesBelow	 = $(hoveredTile).parent().nextAll('div').length ;
		tilesAbove	 = $(hoveredTile).parent().prevAll('div').length ;
		tilesPerColumn = $( hoveredTile ).parent().parent().children().length ;
		columnHeight = $(hoveredTile).parent().parent().outerHeight() ;
		nml = newMarginLeft(hoveredTile) ;
		nmt = newMarginTop (hoveredTile) ;
		ctw = compressedTileWidth ( hoveredTile ) ;
		cth = compressedTileHeight( hoveredTile ) ;
		var hoveredTileTopMargin  = parseInt( $( hoveredTile ).attr('tp')  ) ;//top margin of hovered tile
		var hoveredTileLeftMargin = parseInt( $( hoveredTile ).attr('lft') ) ;//left margin of hovered tile
 		var fctlb = firstCompressedTileLocationBelow( hoveredTile ) ;
 		var fctlr = firstCompressedTileLocationRight( hoveredTile ) ;
		topVerticalExpand 	  = Math.ceil( ( hoveredTileTopMargin - nmt ) / absoluteTileH ) ; 
		bottomVerticalExpand  = Math.ceil( ( fctlb - (hoveredTileTopMargin + settings.tileHeight) ) / absoluteTileH ) ;
		leftHorizontalExpand  = Math.ceil( ( hoveredTileLeftMargin - nml ) / absoluteTileW ) ;
		rightHorizontalExpand = Math.ceil( ( fctlr - (hoveredTileLeftMargin + settings.tileWidth) )  / absoluteTileW )  ;
	}
	function compressedTileWidth( hoveredTile ){
		var ew = findExpandWidth( hoveredTile ) ;
		var tilesToCompressHorizontally = settings.tilesPerRow - 1 ;  // If one tile will expand then tilesToCompres = totalTilesPerRow - 1 will compress.
		var marginBetweenTilesAltogether = tilesToCompressHorizontally * settings.tileMargin ;
		var remainingWidth = rowWidth - (ew + absoluteTileW + marginBetweenTilesAltogether) ;// The remaining width after expansion in which the compressed tile/s must fit in.
		var compressedAbsoluteTileW = remainingWidth / tilesToCompressHorizontally ;
		return compressedAbsoluteTileW ;
	}
	function compressedTileHeight( hoveredTile ){
		var eh = findExpandHeight( hoveredTile ) ;
		var tilesToCompressVertically = $( hoveredTile ).parent().siblings().length ;
		var marginBetweenTilesAltogether = tilesToCompressVertically * settings.tileMargin ;
		var remainingHeight = columnHeight - (eh + absoluteTileH + marginBetweenTilesAltogether) ;// The remaining width after expansion in which the compressed tile/s must fit in.
		var compressedAbsoluteTileH = remainingHeight / tilesToCompressVertically ;
		return compressedAbsoluteTileH ;
	}
	function newMarginLeft( hoveredTile ){
		ctw = compressedTileWidth( hoveredTile ) ;// redundant method call ?
		var newMarginLeft = (tilesToLeft * ctw) + (tilesToLeft * settings.tileMargin) ;
		
		return newMarginLeft ;
	}
	function newMarginTop( hoveredTile ){
		cth = compressedTileHeight( hoveredTile ) ;// redundant method call ?
		var newMarginTop = (tilesAbove * cth) + (tilesAbove * settings.tileMargin) ;
		
		return newMarginTop ;
	}
	function firstCompressedTileLocationRight( hoveredTile ){
		var ew = findExpandWidth( hoveredTile ) ;
		var firstPos = nml + ew + absoluteTileW ;
		
		return firstPos ;
	}
	function firstCompressedTileLocationBelow( hoveredTile ){
		var eh = findExpandHeight( hoveredTile ) ;
		var firstPos = nmt + eh + absoluteTileH ;
		
		return firstPos ;
	}
	function findExpandWidth( hoveredTile ) {
		var expandWidth = settings.landscapeExpandWidth ;
		if( $(hoveredTile).attr('mode') == "portrait" ){ expandWidth = settings.portraitExpandWidth ; }
		
		return expandWidth ;
	}
	function findExpandHeight( hoveredTile ) {
		var expandHeight = settings.landscapeExpandHeight ;
		if( $(hoveredTile).attr('mode') == "portrait" ){ expandHeight = settings.portraitExpandHeight ; }
		
		return expandHeight ;
	}
	function compressedTileHeightAbove( hoveredTile, iya ){
		if( $(hoveredTile).parent().index() <= 0 ){ return null ; }
		var tilesToCompress = iya + 1 ; 
		var spaceTakenBeforeCompression = tilesToCompress * absoluteTileH ;
		if( nmt > spaceTakenBeforeCompression ){ return null ;}
		var remainingSpaceToFitTilesIn = nmt - ( tilesToCompress * settings.tileMargin ) ;
		var cthAbove = remainingSpaceToFitTilesIn / tilesToCompress ;

		return cthAbove ;
	}
 	function compressedTileHeightBelow( hoveredTile, iyb ){
		if( $(hoveredTile).parent().index() >= (tilesPerColumn -1) ){ return null ; }
		var tilesToCompress = tilesPerColumn - iyb ; 
		var spaceTakenBeforeCompression = tilesToCompress * absoluteTileH ;
		var eh = findExpandHeight( hoveredTile ) ;
		if( (nmt + eh + absoluteTileH) < (columnHeight - spaceTakenBeforeCompression ) ){ return null ;}
		var remainingSpaceToFitTilesIn = columnHeight - (nmt + eh + absoluteTileH) - (tilesToCompress * settings.tileMargin);
		var cthBelow = remainingSpaceToFitTilesIn / tilesToCompress ;
		
		return cthBelow ;
	}
	function compressedTileWidthLeft( hoveredTile, indexXL ){
		if( $(hoveredTile).index() <= 0){ return null ; }
		var tilesToCompress = indexXL + 1 ;
		var spaceTakenBeforeCompression = tilesToCompress * absoluteTileW ;
		if( nml > spaceTakenBeforeCompression){ return null ; }
		var remainingSpaceToFitTilesIn = nml - ( tilesToCompress * settings.tileMargin );
		var ctwLeft = remainingSpaceToFitTilesIn / tilesToCompress ;
		
		return ctwLeft ;
	}
	function compressedTileWidthRight( hoveredTile, indexXR ){
		if( $(hoveredTile).index() >= settings.tilesPerRow ){ return null ; }
		var tilesToCompress = settings.tilesPerRow - indexXR ;
		var spaceTakenBeforeCompression = tilesToCompress * absoluteTileW ;
		var ew = findExpandWidth( hoveredTile ) ;
		if( (nml + ew + absoluteTileW) < ( rowWidth - spaceTakenBeforeCompression ) ){ return null ; }
		var remainingSpaceToFitTilesIn = rowWidth - (nml + ew + absoluteTileW) - (tilesToCompress * settings.tileMargin);
		var ctwRight = remainingSpaceToFitTilesIn / tilesToCompress ;
		
		return ctwRight ;
	}
})( jQuery ) ;
