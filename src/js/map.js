import { Loader } from "@googlemaps/js-api-loader"


const loader = new Loader({
    apiKey: "AIzaSyBxqDxPVVnvr7VDfGkohR7oQjmoorZmkbc",
    version: "weekly"
  });
  loader.load().then(() => {
    let map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.893009, lng: 27.567444},
        zoom: 7
      });
      let markers = [
        {
            coordinates: {lat: 53.893009, lng: 27.567444},
            info: '<h3>Минск</h3><br><img width="400px" height="200px"  src="https://ethnomir.ru/upload/medialibrary/59c/1.jpg"><br>'
        },
        {
            coordinates: {lat: 55.751956, lng: 37.622634},
            info: '<h3>Москва</h3><br><img width="400px" height="200px" src="https://traveller-eu.ru/sites/default/files/styles/index/public/moscow-3550477_1280_0.jpg?itok=JWaobhQK"><br>'
        },
        {
            coordinates: {lat: 59.940208, lng: 30.328092},
            info: '<h3>Санкт-Петербург</h3><br> <img width="400px" height="200px" src="https://pulkovoairport.ru/r/_content/65d3918aff22155ee5a200d74f6192b0/Alexander_Papichev.jpg"><br>'
        },
        {
            coordinates: {lat: 50.449973, lng: 30.524911},
            info: '<h3>Киев</h3><br><img width="400px" height="200px" src="https://cdn22.img.ria.ru/images/07e4/08/1b/1576383811_175:94:3058:1716_1920x0_80_0_0_d506fb4ba7e476a65bc5e1eba946066c.jpg"><br>'
        },
        {
            coordinates: {lat: 49.842957, lng: 24.031111},
            info: '<h3>Львов</h3><br><img width="400px" height="200px"  src="https://visaby.com/site/uploaded/Strany/Ukraine/Lviv/lviv-zastavka.jpg"><br>'
        },
        {
            coordinates: {lat: 52.0976214, lng: 23.7340503},
            info: '<h3>Брест</h3><br><img width="400px" height="200px"  src="https://smp.by/wp-content/uploads/2020/05/%D1%81%D0%BE%D0%B2%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F-2.jpg"><br>'
        },
        {
            coordinates: {lat: 55.1848061, lng: 30.201622},
            info: '<h3>Витебск</h3><br><img width="400px" height="200px"  src="https://www.visit-belarus.com/wp-content/uploads/2016/10/vitebsk_pahomenko.jpg"><br>'
        },
        {
            coordinates: {lat: 52.4411761, lng: 30.9878462},
            info: '<h3>Гомель</h3><br><img width="400px" height="200px"  src="https://letsportpeople.com/wp-content/uploads/2019/02/gomel-marathon-2019-featured-945x525.jpg"><br>'
        },
        {
            coordinates: {lat: 53.6693538, lng: 23.8131306},
            info: '<h3>Гродно</h3><br><img width="400px" height="200px"  src="https://vgr.by/wp-content/uploads/2020/01/astro_grodno.jpg"><br>'
        },
        {
            coordinates: {lat: 53.9007159, lng: 30.3313598},
            info: '<h3>Могилёв</h3><br><img width="400px" height="200px"  src="https://mogilevnews.by/sites/default/files/styles/image_article/public/uploaded/56c60792d382a1874dd818d3e02b5417.jpg?itok=DYg0qTy4"><br>'
        },
        {
            coordinates: {lat: 54.687157, lng: 25.279652},
            info: '<h3>Вильнюс</h3><br><img width="400px" height="200px"  src="https://letsportpeople.com/wp-content/uploads/2019/03/vilnius-marathon-2019-featured.jpg"><br>'
        },
        {
            coordinates: {lat: 56.946285, lng: 24.105078},
            info: '<h3>Рига</h3><br><img width="400px" height="200px"  src="https://img-cdn.tinkoffjournal.ru/main____riga_latviya___shutterstock_1104804755.58u4xleu7eqf.jpg"><br>'
        },
        {
            coordinates: {lat: 52.237049, lng: 21.017532},
            info: '<h3>Варшава</h3><br><img width="400px" height="200px"  src="https://triplook.me/media/resorts/photo/a/0/rf4.jpg"><br>'
        },
        {
            coordinates: {lat: 50.073658, lng: 14.418540},
            info: '<h3>Прага</h3><br><img width="400px" height="200px"  src="https://turizm.world/wp-content/uploads/2018/06/panorama-praga.jpg"><br>'
        },
        {
            coordinates: {lat: 47.497913, lng:  19.040236},
            info: '<h3>Будапешт</h3><br><img width="400px" height="200px"  src="https://tripplanet.ru/wp-content/uploads/europe/hungary/budapest/budapesht-dostoprimechatelnosti.jpg"><br>'
        }

    ];
    for(let i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }

    function addMarker(properties) {
        let marker = new google.maps.Marker({
            position: properties.coordinates,
            map: map
        });

        if(properties.image) {
            marker.setIcon(properties.image);
        }

        if(properties.info) {
            let InfoWindow = new google.maps.InfoWindow({
                content: properties.info
            });

            marker.addListener('click', function(){
                InfoWindow.open(map, marker);
            });
        }
    }
});




