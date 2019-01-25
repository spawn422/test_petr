$('document').ready(function(){
    loadProducts();
});
function loadProducts(){
    //загрузка товаров
    $.getJSON('products.json', function(data){
        //console.log(data);
        var html='';

        for (var key in data){
        //$.each(data, function(key, value){
            html+=$('.btn_cart').attr("data-product-id", data[key]['productId']);
            $('.product_code').text('код: '+data[key]['code'].replace(/^0+/, ''));
            $('.product__link').text(data[key]['title']);
            //$('.product_tags').html('<p>Могут понадобиться:</p><a href="#" class="url--link">' + data[key]['assocProducts'] + '</a>');



            
            //out+=data[key]['productId'];
        }
       
    })
};