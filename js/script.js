window.addEventListener('DOMContentLoaded', () => {

    /* burgermenu */
    const menu = document.querySelector('.navbar__menu'),
        menuItems = document.querySelectorAll('.navbar__item'),
        hamburger = document.querySelector('.navbar__burger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active')
        menu.classList.toggle('active')
    });
    menuItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.toggle('active')
            menu.classList.toggle('active')
        })
    });
    // Animations

    const animItems = document.querySelectorAll('._anim-items');

    if (animItems.length > 0) {

        window.addEventListener('scroll', animOnScroll);

        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 3;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;

                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-off')) {
                        animItem.classList.remove('_active');
                    }
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            }
        }

        setTimeout(() => {
            animOnScroll();
        }, 300);

    }
    /* Jquery */
    $(document).ready(function () {
        // loader 
        setTimeout(function () {
            $('.loader_bg').fadeToggle();
        }, 600);
        // navmenu on scroll
        $(window).scroll(function () {
            if (this.scrollY > 40) {
                $('.navbar').addClass('sticky');
                $('.gotop').fadeIn();
            } else {
                $('.navbar').removeClass('sticky');
                $('.gotop').fadeOut();
            }

        });

        // modal
        $('.modal__close').on('click', function () {
            $('.overlay, #thanks').fadeOut('slow');
        });

        // gotop

        $('.gotop').click(function () {
            scroll(0, 0)
        });

        // mailer
        $('form').submit(function (e) {
            e.preventDefault();/* отключаем перезагрузку страницы */
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function () {
                $(this).find("input").val("");
                $('.overlay, #thanks').fadeIn('slow');
                $('form').trigger('reset');
            });
            return false;
        });

    });


});