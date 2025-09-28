$(function () {
  var hypnosis = new Vue({
    el: '#app',
    data: {
        showbox: 1, //动画框
        hsnum:60, //总数
        hscont:0, //计数
        jishi:5,
        hs:'1',
        hsList: [],
        musicpl:'01',
        ScreenLight:50,
        musicList: [
          {name:'白度母心咒（推荐）',value:'01'},
          {name:'莲师心咒',value:'02'},
          {name:'观音十法',value:'03'},
          {name:'般若心咒',value:'04'},
          {name:'藏传大悲咒',value:'05'},
        ],
        hsanimen: false,//显示和尚动画
        shuomin:'',
        daoj: 5,
        songUrl: '',
        songUrl2: './music/sd.mp3',
    },  
    
    methods: {
      gzsm(fl,loop) {  
        // this.$refs.audioPlayer.stop();
        this.songUrl = 'music/'+fl;
        this.$refs.audioPlayer.play();
        if (loop) {
          this.$refs.audioPlayer.loop = true;
        }
      },
      step(n,muc) {
        this.showbox = n
        this.musicStop();
        if (muc) {
          this.musicpl = muc;
        }
      },
      musicStop() {
        if (this.$refs.audioPlayer) {
          this.$refs.audioPlayer.pause(); 
          this.$refs.audioPlayer.currentTime = 0; 
        }
        if (this.$refs.audioPlayer2) {
          this.$refs.audioPlayer2.pause(); 
          this.$refs.audioPlayer2.currentTime = 0; 
        }
      },
      stepMiao(sm,lg) {
        const hstotle = this.random(sm,lg);
        this.hsnum= hstotle
          this.hscont=0
          this.hsList= []
          this.showbox= 3
      },
      step4() {    
        this.showbox= 2
      },
      back() {
        history.back();
      },
      replay(st) {
        this.daoj = 5
        this.hscont=0
        this.jishi=5
        this.hsList.class=''     
        this.hsList.top=''     
        this.hsList.left='' 
        this.musicStop() 
        this.showbox = st    
      },
      step7(e) {   
        this.showbox= 3
      },
      daojs(Mk) {
        this.showbox= 4;
        const thisb = this;
        const daojishi = setInterval(function(){ 
          if (Mk == 'B') {
            thisb.gzsm('bz.mp3')          
          }
          if (thisb.jishi==0) {
            clearInterval(daojishi) 
            if (Mk == 'A') {
              thisb.starrun()
              // thisb.gzsm('bz.mp3',false)          
            }
            if (Mk == 'B') {
              thisb.starrun847();
              thisb.hxjs()      
            }
            if (Mk == 'C') {
              thisb.showbox= 5;   
              thisb.gzsm('cj.mp3')  
              setTimeout(() => {
                thisb.gzsm('hxn.mp3',true)
                thisb.hxjs()   
              }, 168000); 
            }
          } else {
            thisb.jishi--
          }
        },1000); 
      },
      starrun() { 
        this.songUrl = "./music/" + "nj"+this.musicpl+".mp3";
        this.showbox= 5;
        this.$refs.audioPlayer.play();
        this.$refs.audioPlayer.loop = true;
        this.pushMonk()
        // for ( let i=1; i <= this.hsnum; i++ ) {
          //   this.hs=this.random(1,4)
          // }
        },
        starrun847() { 
          this.songUrl = "./music/" + "nj"+this.musicpl+".mp3";
          this.songUrl2 = "./music/hx478.mp3";
        this.showbox= 5;
        this.$refs.audioPlayer.play();
        this.$refs.audioPlayer.loop = true;
        this.$refs.audioPlayer2.play();
        this.$refs.audioPlayer2.loop = true;
      },
      hxjs() {
        let daoj = 0;
        const this2 = this;
        const jishiF = setInterval(function(){ 
          daoj++;
          if (daoj==30) {
            this2.musicStop();
            clearInterval(jishiF);  
          }
        },60000);  
      },
      random: function(s,l) { //计算随机数  
        const sjs = Math.floor(Math.random()*(l-s)+s);
        if (sjs == undefined) {
          this.random(s,l)
        }else{
          return sjs;
        }
      },
      pushMonk() {
          let ys=0;
          const this2 = this;
          const addhs = setInterval(function(){
            this2.hsanimen = false
            this2.hs=this2.random(1,4)
            if (ys < this2.hsnum) {
              const pleft = this2.random(6,85);
              const ptop = this2.random(10,60);
              const monkcls = 'monksmall'+this2.hs;
              const hitem = {class:monkcls,top:ptop+'vw',left:pleft+'vw'};
              this2.hsList.push(hitem);
              this2.hscont++
              ys++;
              this2.hsanimen = true
              this2.songUrl2 = "./music/sd.mp3";
              this2.$refs.audioPlayer2.pause(); 
              this2.$refs.audioPlayer2.currentTime = 0; 
              this2.$refs.audioPlayer2.play();
            } else {
              clearInterval(addhs);  
              this2.step(6);
            }
            },5000);
      },
    },    
    mounted:function () {     
      var audioElement = document.getElementById('audioPlayer');
      audioElement.volume = 1;     
    },
  });
});