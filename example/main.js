
const template = `
	<h2>Welcome {{user.firstname}} <span>{{user.lastname}}</span></h2>
	<p>computed: {{fullname}}</p>
	<input type="text" v-model="user.lastname">
	<button v-on:click="sayHi">change model</button>
`;

const vm = new MVVM();