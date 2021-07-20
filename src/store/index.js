import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import axios from "axios"
import createPersistedState from 'vuex-persistedstate';

import {
  Scene,
  //TrackballControls,
  PerspectiveCamera,
  WebGLRenderer,
  // Color,
  //FogExp2,
  // CylinderBufferGeometry,
  // MeshPhongMaterial,
  Mesh,
  //DirectionalLight,
  AmbientLight,
  // LineBasicMaterial,
  // Geometry,
  // Vector3,
  // Line
} from "three-full";
import { BoxGeometry, DoubleSide,  MeshLambertMaterial, 
  MeshStandardMaterial, PlaneBufferGeometry, PointLight, TextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

Vue.use(Vuex)
 
export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false,
    isNow: true,
    fastTime: null,
    width: 0,
    height: 0,
    camera: null,
    controls: null,
    scene: null,
    renderer: null,
    axisLines: [],
    pyramids: [],
    Arts: [
      {
        title : "CPRKR",
        engTitle : "CPRKR",
        subtitle: "Jean-Michel Basquiat (1982)",
        content: "Style: Neo-Expressionism,\n Street artGenre: figurative\n Media: acrylic, crayon, canvas\n Location: Private Collection\n Dimensions: 152.5 x 101.5 cm",
        src: require("../assets/pictures/pictures0.jpeg"),
        date: "2021-07-30",
        price: "500"
      },
      {
        title : "Dressing for the Carnival",
        engTitle : "Dressing for the Carnival",
        subtitle: "Winslow Homer (1877)",
        content: "Having visited Virginia as an artist-correspondent during the Civil War, Homer returned there at least once during the mid-1870s, apparently to observe what had happened to the lives of former slaves during the first decade of Emancipation. The brilliant light and color of this scene, originally titled \"Sketch–4th of July in Virginia,\" contradict its more solemn meaning. The central figure is being dressed as Harlequin, the clown and social outcast of European comic theater. The strips of cloth being sewn to his costume, however, derive from African ceremonial dress and from the festival of Jonkonnu, when slaves left their quarters to dance at their master's house. In the years following the Civil War, aspects of Jonkonnu became part of the celebration of the Fourth of July and Emancipation. Here, the pageantry of multihued costumes suggests a festive celebration, but it also reflects the dislocation of traditional African culture and the beginnings of its transformation into a new tradition.",
        src: require("../assets/pictures/pictures1.jpeg"),
        date: "2021-07-31",
        price: "300"
        
      },
      {
        title : "Cleopatra Testing Poisons on Those Condemned to Death",
        engTitle : "Cleopatra Testing Poisons on Those Condemned to Death",
        subtitle: "Alexandre Cabnel (1887)",
        content: "Cleopatra Testing Poisons on Condemned Prisoners (Cléopâtre essayant des poisons sur des condamnés à mort) is an 1887 painting by the French artist Alexandre Cabanel. It is now in the Royal Museum of Fine Arts, Antwerp. It shows Cleopatra VII sitting at a banquet observing the effects of poisons on prisoners condemned to death. Cabanel had always had a taste for historical and orientalist themes and when the painting was first seen by the Parisian public he was feted by the critics and showered with honours. Several international collectors attempted to buy the painting.",
        src: require("../assets/pictures/pictures2.jpeg"),
        date: "2021-08-01",
        price: "680"
      },
      {
        title : "Un Chien Andalou",
        engTitle : "Un Chien Andalou",
        subtitle: "Salvador Dali (1928)",
        content: "Un Chien Andalou  is a 1929 Franco-Spanish silent surrealist short film by Spanish director Luis Buñuel and artist Salvador Dalí. Buñuel's first film, it was initially released in a limited capacity at Studio des Ursulines in Paris, but became popular and ran for eight months. Un Chien Andalou has no plot in the conventional sense of the word. With disjointed chronology, jumping from the initial 'once upon a time' to 'eight years later' without events or characters changing, it uses dream logic in narrative flow that can be described in terms of the then-popular Freudian free association, presenting a series of tenuously related scenes.",
        src: require("../assets/pictures/pictures3.jpeg"),
        date: "2021-08-15",
        price: "450"
      },
      {
        title : "Child with dove",
        engTitle : "Child with dove",
        subtitle: "Pablo Picasso (1901)",
        content: "Child with a Dove, also described as Child Holding a Dove, Child with a Pigeon, Girl with a Dove and Girl with a Pigeon, is an oil on canvas painting by the Spanish artist Pablo Picasso, which he created in 1901 at the start of his Blue Period. The painting is a depiction of a young girl in a white dress holding a white dove, and represents an important transitional moment in the artist’s career. It was on public display at the National Gallery in London, England for nearly four decades before its private sale in 2012, when it achieved a price of £50 million.",
        src: require("../assets/pictures/pictures4.jpeg"),
        date: "2021-08-13",
        price: "600"
      },
      {
        title : "Seated breton girl",
        engTitle : "Seated breton girl",
        subtitle: "Paul Gaugin (1889)",
        content: "Style: Post-Impressionism\n Period: Breton period\n Genre: genre painting\n Media: oil, canvas\n Location: Ny Carlsberg Glyptotek, Copenhagen, Denmark",
        src: require("../assets/pictures/pictures5.jpeg"),
        date: "2021-08-22",
        price: "500"
      },
      {
        title : "Simultaneous Counter Composition",
        engTitle : "Simultaneous Counter Composition",
        subtitle: "Theo van Doesburg (1930)",
        content: "Simultaneous Counter-Composition focuses on the balance of the squares. All of the colored shapes are cut-off squares and even the canvas itself is a square. By using squares, van Doesburg promotes the purely geometric form of painting.",
        src: require("../assets/pictures/pictures6.jpeg"),
        date: "2021-09-13",
        price: "300"
      },
      {
        title : "Going Home, Brittany",
        engTitle : "Going Home, Brittany",
        subtitle: "Frank Mason (1965)",
        content: "Date: c.1965\n Style: Realism, Classical Realism\n Genre: cityscape\n Media: canvas, oil\n Dimensions: 76.2 x 91.44 cm",
        src: require("../assets/pictures/pictures7.jpeg"),
        date: "2021-09-15",
        price: "400"
      },
      {
        title : "Girl with Ballon",
        engTitle : "Girl with Ballon",
        subtitle: "Banksy (2002)",
        content: "Girl with Balloon (also, Balloon Girl or Girl and Balloon) is a 2002-started London series of stencil murals by the graffiti artist Banksy, depicting a young girl with her hand extended toward a red heart-shaped balloon carried away by the wind. The first work was on Waterloo Bridge, and other murals were around London, though none remain there. Banksy has several times used variants of this design to support social campaigns: in 2005 about the West Bank barrier, in 2014 about the Syrian refugee crisis, and also about the 2017 UK election. A 2017 Samsung poll ranked Girl with Balloon as the United Kingdom's number one favourite artwork.",
        src: require("../assets/pictures/pictures8.jpeg"),
        date: "2021-09-28",
        price: "800"
      },
      {
        title : "Saturday Night",
        engTitle : "Saturday Night",
        subtitle: "Clementine Hunter (1968)",
        content: "Hunter lived near this popular Saturday night Honky Tonk, and in this particular painting, she captures all the late-night action, including drinking, fighting and violence. which she didn't approve of.",
        src: require("../assets/pictures/pictures9.jpeg"),
        date: "2021-10-01",
        price: "600"
      },
      {
        title : "Space",
        engTitle : "Space",
        subtitle: "Whanki, Kim (1971)",
        content: "eeee",
        src: require("../assets/pictures/pictures10.jpeg"),
        date: "2021-11-01",
        price: "700"
      },
    ]
  },
  getters: {
    CAMERA_POSITION: state => {
      return state.camera ? state.camera.position : null;
    }
  },
  mutations: { //state값을 변화시키는 것
    // 로그인이 성공했을 때
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
    loginError(state){
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    },

    SET_VIEWPORT_SIZE(state, { width, height }) {
      state.width = width;
      state.height = height;
    },
    INITIALIZE_RENDERER(state, el) {
      state.renderer = new WebGLRenderer({ 
        antialias: true,
        powerPreference: 'high-performance'
       });
      state.renderer.setPixelRatio(window.devicePixelRatio);
      state.renderer.setSize(state.width, state.height);
      el.appendChild(state.renderer.domElement);
    },
    INITIALIZE_CAMERA(state) {
      state.camera = new PerspectiveCamera(
        // 1. Field of View (degrees)
        75,
        // 2. Aspect ratio
        window.innerWidth / window.innerHeight,
        // 3. Near clipping plane
        0.1,
        // 4. Far clipping plane
        1000
      );
      state.camera.position.set(0,2,0);
    },
    INITIALIZE_CONTROLS(state) {
   
      // state.controls = new TrackballControls(
      //   state.camera,
      //   state.renderer.domElement
      // );
      state.controls = new OrbitControls(
        state.camera,
        state.renderer.domElement
      );
      state.controls.enableDamping = true;
      state.controls.target.y =2
      //state.controls.enableZoom = false
      // state.controls.rotateSpeed = 1.0;
      // state.controls.zoomSpeed = 1.2;
      // state.controls.panSpeed = 0.8;
      // state.controls.noZoom = false;
      // state.controls.noPan = false;
      // state.controls.staticMoving = true;
      // state.controls.dynamicDampingFactor = 0.3;
      // state.controls.keys = [65, 83, 68];
    },
    UPDATE_CONTROLS(state) {
      state.controls.update();
    },
    INITIALIZE_SCENE(state) {
      state.scene = new Scene();
      var img = require('./space.jpg')
      var img2 = require('../assets/pictures/pictures1.jpeg')
      state.scene.background = new TextureLoader().load(img);
      //state.scene.fog = new FogExp2(0xcccccc, 0.002);

      function addBox(image) {
        var geometry = new BoxGeometry(7, 5, 0.2);
        var texture = new TextureLoader().load(image)
        var material = new MeshStandardMaterial( {color: 0xffffff, map: texture});
        var mesh = new Mesh(geometry, material);
        //mesh.position.y = 2.5
        mesh.position.setFromCylindricalCoords(random(15,25), random(-Math.PI * 2, Math.PI * 2), 2.5)
      /mesh.lookAt(0,2,0)
        state.scene.add(mesh);
      }

      for (let i=0; i<10; i++){
        addBox(img2)
      }

      function random(min, max) {
        return min + Math.random() * (max-min);
      }

      // for (var i = 0; i < 500; i++) {
      //   var mesh = new Mesh(geometry, material);
      //   mesh.position.x = (Math.random() - 0.5) * 1000;
      //   mesh.position.y = (Math.random() - 0.5) * 1000;
      //   mesh.position.z = (Math.random() - 0.5) * 1000;
      //   mesh.updateMatrix();
      //   mesh.matrixAutoUpdate = false;
      //   state.pyramids.push(mesh);
      // }
    
      // lights
      var ambientLight = new AmbientLight(0x202020);
      state.scene.add(ambientLight)
      // var hemilight = new HemisphereLight(0xffffbb, 0x080820, 1)
      // hemilight.color.setHSL(0.6, 1, 0.1)
      //hemilight.groundColor.setHSL(0.1, 0.2, 0.1)
     // state.scene.add(hemilight)
      var pointlight = new PointLight(0xffffff, 1, 100)
      pointlight.position.set(0, 10, 5)
      state.scene.add(pointlight)

      // var lightA = new DirectionalLight(0xffffff);
      // lightA.position.set(1, 1, 1);
      // state.scene.add(lightA);
      // var lightB = new DirectionalLight(0x002288);
      // lightB.position.set(-1, -1, -1);
      // state.scene.add(lightB);
      // var lightC = new AmbientLight(0x222222);
      // state.scene.add(lightC);
      var img3 = require('./space.jpg')
      var groundGeo = new PlaneBufferGeometry(105, 105)
      var groundTex = new TextureLoader().load(img3)
      var groundMat = new MeshLambertMaterial({side: DoubleSide, map: groundTex})
      //groundMat.color.setHSL(0.095, 1, 0.75)
      var ground = new Mesh(groundGeo, groundMat)
      ground.rotation.x = -Math.PI / 2
      state.scene.add(ground)
 
      // var gridHelper = new GridHelper(100,20)
      // state.scene.add(gridHelper)

      // function generateImage(caption) {
      //   const inputs= {
      //     "caption": caption
      //   };
      //   fetch('http://localhost:8001/query', {
      //     method: 'POST',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-type': 'application/json'
      //     },
      //     body: JSON.stringify(inputs)
      //   }) 
      //     .then(response=> response.json())
      //     .then(outputs => {
      //       const { result } = outputs;
      //       //console.log(result)
      //       addBox(result)
      //     })
      // }
      // generateImage('a boat on the river')


      // // Axis Line 1
      // var materialB = new LineBasicMaterial({ color: 0x0000ff });
      // var geometryB = new Geometry();
      // geometryB.vertices.push(new Vector3(0, 0, 0));
      // geometryB.vertices.push(new Vector3(0, 1000, 0));
      // var lineA = new Line(geometryB, materialB);
      // state.axisLines.push(lineA);

      // // Axis Line 2
      // var materialC = new LineBasicMaterial({ color: 0x00ff00 });
      // var geometryC = new Geometry();
      // geometryC.vertices.push(new Vector3(0, 0, 0));
      // geometryC.vertices.push(new Vector3(1000, 0, 0));
      // var lineB = new Line(geometryC, materialC);
      // state.axisLines.push(lineB);

      // // Axis 3
      // var materialD = new LineBasicMaterial({ color: 0xff0000 });
      // var geometryD = new Geometry();
      // geometryD.vertices.push(new Vector3(0, 0, 0));
      // geometryD.vertices.push(new Vector3(0, 0, 1000));
      // var lineC = new Line(geometryD, materialD);
      // state.axisLines.push(lineC);

      // state.scene.add(...state.axisLines);
    },
    RESIZE(state, { width, height }) {
      state.width = width;
      state.height = height;
      state.camera.aspect = width / height;
      state.camera.updateProjectionMatrix();
      state.renderer.setSize(width, height);
      state.controls.handleResize();
      state.renderer.render(state.scene, state.camera);
    },
    SET_CAMERA_POSITION(state, { x, y, z }) {
      if (state.camera) {
        state.camera.position.set(x, y, z);
      }
    },
    RESET_CAMERA_ROTATION(state) {
      if (state.camera) {
        state.camera.rotation.set(0, 0, 0);
        state.camera.quaternion.set(0, 0, 0, 1);
        state.camera.up.set(0, 1, 0);
        state.controls.target.set(0, 0, 0);
      }
    },
    HIDE_AXIS_LINES(state) {
      state.scene.remove(...state.axisLines);
      state.renderer.render(state.scene, state.camera);
    },
    SHOW_AXIS_LINES(state) {
      state.scene.add(...state.axisLines);
      state.renderer.render(state.scene, state.camera);
    },
    HIDE_PYRAMIDS(state) {
      state.scene.remove(...state.pyramids);
      state.renderer.render(state.scene, state.camera);
    },
    SHOW_PYRAMIDS(state) {
      state.scene.add(...state.pyramids);
      state.renderer.render(state.scene, state.camera);
    }
  },
  actions: {
    INIT({ state, commit }, { width, height, el }) {
      return new Promise(resolve => {
        commit("SET_VIEWPORT_SIZE", { width, height });
        commit("INITIALIZE_RENDERER", el);
        commit("INITIALIZE_CAMERA");
        commit("INITIALIZE_CONTROLS");
        commit("INITIALIZE_SCENE");

        // Initial scene rendering
        state.renderer.render(state.scene, state.camera);

        // Add an event listener that will re-render
        // the scene when the controls are changed
        state.controls.addEventListener("change", () => {
          state.renderer.render(state.scene, state.camera);
        });

        resolve();
      });
    },
    ANIMATE({ state, dispatch }) {
      window.requestAnimationFrame(() => {
        dispatch("ANIMATE");
        state.controls.update();
      });
    },
    // 로그인 시도
    login({dispatch}, loginObj) {  // eslint-disable-line no-unused-vars
        // 로그인 -> 토큰 반환
        axios.post("http://192.249.18.172:80/login/", loginObj) // paremeter (=body)
        .then(res => {
          // 성공시 token 이 옴, 토큰을 헤더에 포함
          // if (res.data.ok) {
            let token = res.data.token
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("access_token", token)
            dispatch("getMemberInfo")
          // } else {
          //   alert('이메일과 비밀번호를 확인하세요.')
          // }
        })
        .catch((error) => {
          console.log('error : ', error);
          alert('통신 실패')
        });
    },
    logout({commit}){
      let token = localStorage.getItem("access_token")
      if (token !=null ) {
        let config = {
          headers : {
            "token": token
          }
        }
      commit("logout")
      localStorage.clear()
      axios.post("http://192.249.18.172:80/logout", config)
        .then(res2=>{
          if (res2.data.ok) 
            alert('로그아웃되었습니다.')
            router.push({name: "home"}) 
        })
        .catch(()=>{ alert('로그아웃 통신 실패') })
  
      }
    },
    getMemberInfo({commit}) {
      let token = localStorage.getItem("access_token")
      if (token !=null ) {
        let config = {
          headers : {
            "token": token
          }
        }
        // 토큰 -> userinfo 반환
        // 새로고침 -> 토큰만 가지고 userinfo 요청
        axios.get("http://192.249.18.172:80/login/request_userinfo/", config)
          .then(response=>{ 
            if (response.data.ok) {
              let userinfo = {
                username : response.data.data.username,
                avatar : response.data.data.avatar,
                money : response.data.data.money,
                wish : response.data.data.wish,
                MyArt : response.data.data.MyArt
              }
              commit('loginSuccess', userinfo)
              router.push({name: "home"}) 
            } else {
              alert('이메일과 비밀번호를 확인하세요.')
              router.push({name: "home"}) 
            }
          })
          .catch(()=>{ alert('token 통신 실패') })
      }
      else {
        router.push({name: "home"}) 
      }
    },

  },
  modules: {
  },
  plugins: [
    createPersistedState()
  ]

})
