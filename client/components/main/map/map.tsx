import styles from './map.module.css';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Loading from '../loading/loading';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface dataType {
  data: {
    postList: [
      {
        category: string;
        id: number;
        location_latitude: string;
        location_longitude: string;
      },
    ];
  };
}
interface mapType {
  setLocation: Dispatch<SetStateAction<number[]>>;
  roomsData: Dispatch<SetStateAction<number>>;
}
function Map({ setLocation, roomsData }: mapType) {
  // 로딩의 상태
  const [loading, setLoading] = useState<boolean>(false);
  // 데이터를 받아와 카테고리에 따라 다른 이미지를 사용합니다.
  const [data, setData] = useState<dataType>();

  // 글의 리스트를 받아옵니다.
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/main`,
        );
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    const mapScript = document.createElement('script');
    const createElement = document.querySelector('#CreateRoom')! as HTMLElement;
    const joinRoom = document.querySelector('#JoinRoom')! as HTMLElement;
    const makeRoom = document.querySelector('#MakeRoom')! as HTMLElement;
    const chatRoom = document.querySelector('#ChatRoom')! as HTMLElement;

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const clickEvent = (marker: any, map: any, roomId?: number) => {
      // 마커 클릭 함수
      window.kakao.maps.event.addListener(marker, 'click', function () {
        createElement.style.display = 'none';
        chatRoom.style.display = 'none';
        makeRoom.style.display = 'none';
        joinRoom.style.display = 'flex';
        if (roomId) {
          roomsData(roomId);
        }
        // 모바일시 마커를 클릭 하면 사이드바를 나오게 합니다.
        var pos = marker.getPosition();
        map.panTo(pos);
      });
      // 맵 클릭 함수
      window.kakao.maps.event.addListener(map, 'click', function () {
        joinRoom.style.display = 'none';
        makeRoom.style.display = 'none';
        createElement.style.display = 'flex';
        chatRoom.style.display = 'none';
      });
    };

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude, // 사용자의 위도
            lon = position.coords.longitude; // 사용자의 경도

          setLocation([lat, lon]);

          let options = {
            center: new window.kakao.maps.LatLng(lat, lon),
          };

          const circle = new window.kakao.maps.Circle({
            center: new window.kakao.maps.LatLng(lat, lon), // 원의 중심좌표 입니다
            radius: 200, // 미터 단위의 원의 반지름입니다
            strokeWeight: 5, // 선의 두께입니다
            strokeColor: '#FF8A3D', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일 입니다
            fillColor: '#FF8A3D', // 채우기 색깔입니다
            fillOpacity: 0.3, // 채우기 불투명도 입니다
          });
          let map = new window.kakao.maps.Map(container, options);
          const markerPosition = new window.kakao.maps.LatLng(lat, lon);
          let marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          circle.setMap(map); // 원을 맵에 그려줍니다.
          marker.setMap(map); // 마커를 맵에 찍어줍니다.
          if (data) {
            const roomList = data.data.postList;
            for (let i = 0; i < roomList.length; i++) {
              let imageSrc = '';
              if (roomList[i].category === '햄버거') {
                imageSrc = '/image/hamburger.png';
              } else if (roomList[i].category === '치킨') {
                imageSrc = '/image/chicken.png';
              } else if (roomList[i].category === '피자') {
                imageSrc = '/image/pizza.png';
              } else if (roomList[i].category === '한식') {
                imageSrc = '/image/rice.png';
              } else if (roomList[i].category === '자장면') {
                imageSrc = '/image/chNoodles.png';
              } else if (roomList[i].category === '커피*디저트') {
                imageSrc = '/image/coffee.png';
              } else if (roomList[i].category === '도시락') {
                imageSrc = '/image/lunchBox.png';
              } else if (roomList[i].category === '일식') {
                imageSrc = '/image/sushi.png';
              } else if (roomList[i].category === '분식') {
                imageSrc = '/image/tteokbokki.png';
              }
              const imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
                imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              const markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption,
              );

              // 마커를 생성합니다
              marker = new window.kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new window.kakao.maps.LatLng(
                  roomList[i].location_latitude,
                  roomList[i].location_longitude,
                ), // 마커의 위치
                image: markerImage,
              });
              clickEvent(marker, map, roomList[i].id);
            }
          }
        });
      });
      setLoading(true); // 로딩을 꺼줍니다.
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [data?.data.postList.length]);

  return (
    <main className={styles.main}>
      <Loading state={loading}></Loading>
      <section id="map" className={styles.map} />
    </main>
  );
}

export default Map;
