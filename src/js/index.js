$('document').ready(function(){
    loadProducts();
});
function loadProducts(){
    //загрузка товаров
    $.getJSON('products.json', function(data){
        //console.log(data);
        products();
        
        function products(){
            

            var html='';
        
   
            $.each(data, function(key, value){
                var
                str = value.primaryImageUrl,
                newStr = str.substring(0, str.length - 4),
                imgSrc = 'http:' + newStr + '_220x220_1.jpg',
                code = value.code.replace(/^0+/, ''),
                assoc = value.assocProducts.split(';'),
                linkAssoc;
                    for (let i=0; i < assoc.length; i++ ){ 
                    linkAssoc += '<a href="#" class="url--link">' + assoc[i] +',</a>';
                    }

                var strLink = linkAssoc.replace(/undefined/g || /,/ ,'');
                var newLink = strLink.substring(0, strLink.length - 5) +'.</a>';            

  
                html += '<div class="products_page pg_0"><div class="product product_horizontal"><span class="product_code">код: '+ code + '</span>';
                html += '<div class="product_status_tooltip_container"> <span class="product_status">Наличие</span> </div> <div class="product_photo"> <a href="#" class="url--link product__link"><img src=\'' + imgSrc + '\'></a>';
                html += '</div> <div class="product_description"> <a href="#" class="product__link">'+ data[key]['title'] + '</a> </div> <div class="product_tags hidden-sm"><p>Могут понадобиться:	&nbsp;</p>' + newLink +' </div>';
                html += '<div class="product_units"> <div class="unit--wrapper"> <div class="unit--select unit--active"> <p class="ng-binding">За м. кв.</p> </div><div class="unit--select"> <p class="ng-binding">За упаковку</p></div></div></div> <p class="product_price_club_card"><span class="product_price_club_card_text">По карте<br>клуба</span><span class="goldPrice">'+ data[key]['priceGoldAlt'].toFixed(2) + '</span><span class="retailPrice hide-price">'+ data[key]['priceGold'].toFixed(2) + '</span>' 
                html += '<span class="rouble__i black__i"><svg version="1.0" id="rouble__b" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_black"></use> </svg></span></p><p class="product_price_default"> <span class="retailPrice">'+ data[key]['priceRetailAlt'].toFixed(2) + '</span><span class="retailPrice hide-price">'+ data[key]['priceRetail'].toFixed(2) + '</span>'
                html += '<span class="rouble__i black__i"><svg version="1.0" id="rouble__g" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_gray"></use>  </svg></span></p><div class="product_price_points"> <p class="ng-binding">Можно купить за '+ (data[key]['priceRetailAlt']*0.7).toFixed(2) + ' балла</p> </div>'
                html += '<div class="list--unit-padd"></div> <div class="list--unit-desc"> <div class="unit--info"> <div class="unit--desc-i"></div> <div class="unit--desc-t"><p><span class="ng-binding">Продается упаковками:</span><span class="unit--infoInn">'+data[key]['unitRatio'] +' '+ data[key]['unit'] +' = ' + data[key]['unitRatioAlt'].toFixed(2) + ' ' + data[key]['unitAlt'] + '</span></p></div></div></div>'
                html += '<div class="product__wrapper"><div class="product_count_wrapper"><div class="stepper"><input class="product__count stepper-input" type="text" value="1">'
                html += '<span class="stepper-arrow up" data-art="p"></span><span class="stepper-arrow down"></span> </div></div><span class="btn btn_cart" data-product-id="'+ value.productId +'" data-url="/cart/"><svg class="ic ic_cart"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use></svg><span class="ng-binding">В корзину</span></span></div></div></div></div>'
            }); 

        $('#products_section').html(html);
        $('.stepper-arrow.up').on('click', arrowUP);
        $('.stepper-arrow.down').on('click', arrowDown);
        $('.unit--select').on('click',select);
        
        };
        function arrowUP(){
                var $input = $(this).parent().find('input');
                $input.val(parseInt($input.val()) + 1);
                var input = $input
                return false;
                
        };
        function arrowDown(){
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            return false;
        };
        function select(){
            if ($(this).hasClass('unit--active')) {
                return;
            };
            
            $(this).parent().find('.unit--select').toggleClass('unit--active');
            $(this).closest('.product').find('.goldPrice').toggleClass('hide-price');
            $(this).closest('.product').find('.retailPrice').toggleClass('hide-price');

        };
    });
};