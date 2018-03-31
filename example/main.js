import MVVM from 'mvvm'

const template = `
	<h2><span>Welcome！</span> {{user.firstname}}<span>{{user.lastname}}</span></h2>
	<p><span>computed: </span>{{fullname}}</p>
  <p>{{word}}</p>
	<input type="text" v-model="user.lastname">
	<button v-on:click="sayHi">change model</button>
`;

const vm = new MVVM({
  el: '#app',
  template,
  data: {
    word: 'Hello World!',
    user: {
      firstname: 'weng', 
      lastname: 'jq'
    }
  },
  computed: {
    fullname: function () {
      // getter 调用
      return this.user.firstname + ' ' + this.user.lastname;
    }
  },
  methods: {
    sayHi: function () {
      this.word = 'Hi, everybody!';
    }
  }
});
window.vm = vm;
console.log(vm)