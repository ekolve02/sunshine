product_list = null
select_payment = null
tg = window.Telegram.WebApp;

$(document).ready(function() {
    console.log('ready')

    $('.card-date').on('input', function() {
        // Ограничение ввода до 4 символов
        if ($(this).val().length > 6) {
            $(this).val($(this).val().substr(0, 6));
          }
  
        // Добавление '/' после первых двух символов
        if ($(this).val().length >= 3 && $(this).val().charAt(2) !== '/') {
            $(this).val($(this).val().substr(0, 2) + '/' + $(this).val().substr(2));
        }
        if ($(this).val().length <= 2 && $(this).val().charAt(2) !== '/') {
            $(this).val($(this).val().substr(0, 2) + $(this).val().substr(2));
        }
      });
      $(document).on("change keyup input click", "input[type='text']", function() {
        if(this.value.match(/[^0-9\/]/g)){
            this.value = this.value.replace(/[^0-9\/]/g, "");
        };
    });
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
    $('body').css('overflow', 'hidden')
    $('#acceptBuy').css('background', 'gray')
    $('#acceptBuy').prop('disabled', true)

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
    $('.payment').css('display', 'none')
    $('.selection-payment li').css('background', '#383838');
    $('body').css('overflow', 'auto')
})


$('#acceptBuy').click(function() {
    $('.product-info').css('display', 'none')
    $('.payment').css('display', 'grid')
    $('.payment input').val('')
})

$('#acceptPay').click(function() {
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

    $('#acceptBuy').css('background', '#51b452')
    $('#acceptBuy').prop('disabled', false)

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
