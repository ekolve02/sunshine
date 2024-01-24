product_list = null
select_payment = null
tg = window.Telegram.WebApp;

$(document).ready(function() {
    console.log('ready')
})

$('li button').on('click', function() {
    var listItem = $(this).closest('li');
    
    var productName = listItem.find('h1').text();
    var desc = listItem.find('p').text();
    var price = parseFloat(listItem.find('span').text().replace(' ₣', ''));

    var product = {
        name: productName,
        desc: desc,
        price: price
    };

    $('.product-name').text('Товар: ' + productName)
    $('.product-price').text('Цена: ' + price + ' ₣')

    $('.overflow').css('display', 'block')
    $('.product-info').css('display', 'flex')
    $('.products').css('filter','blur(3px)')

    product_list = product;

    console.log(product)

    // $('.accept_buying').text('Корзина (' + product_list.length + ')')
    // checkList()

});

$('.overflow').click(function(){
    $('.overflow').css('display', 'none')
    $('.product-info').css('display', 'none')
    $('.products').css('filter','none')
    $('.payment-form').css('display', 'none')
    $('.selection-payment li').css('background', '#383838');
})

$('#acceptBuy').click(function() {
    $('.product-info').css('display', 'none')
    $('.payment-form').css('display', 'flex')
    $('.payment-form p').html('Ваш ключ для игры ' + product_list.name + ':')
    $('.game-key').html(generateRandomNumber())
})

$('.selection-payment li').on('click', function() {
    $('.selection-payment li').css('background', '#383838');
    
    $(this).css('background', '#5b7da6')
    $('#acceptPayment').css('background', '#51B452')
    $('#acceptPayment').html('Оплата через ' + $(this).html())

});

function generateRandomNumber() {
    var randomNumber = '';
    var segments = 5; // Количество сегментов в числе
    var digitsInSegment = 5; // Количество цифр в каждом сегменте

    for (var i = 0; i < segments; i++) {
        for (var j = 0; j < digitsInSegment; j++) {
            randomNumber += Math.floor(Math.random() * 10);
        }

        if (i < segments - 1) {
            randomNumber += '-';
        }
    }

    return randomNumber;
}