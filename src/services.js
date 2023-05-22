import { initializeApp } from 'firebase/app';
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	getAuth,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	setDoc,
	addDoc,
	collection,
	query,
	where,
	getDocs,
	deleteDoc,
	orderBy
} from 'firebase/firestore';
import axios from 'axios';

const CLOUD_NAME = 'dfvqmpyji';
const UPLOAD_PRESET = 'qzlqkpry';

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: `${process.env.REACT_APP_PROJECT_ID}.appspot.com`,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
	// for DB
	databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}-default-rtdb.asia-southeast1.firebasedatabase.app`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize DB
const db = getFirestore(app);

export class FirebaseService {
	checkLoginState = (setLoginState) => {
		const myAuth = getAuth();
		onAuthStateChanged(myAuth, (user) => {
			console.log('check Login', user);
			if (user) {
				const { uid, email, photoURL } = user;
				setLoginState({
					state: true,
					user: {
						uid,
						email,
						profile: photoURL,
					},
				});
			}
		});
	};

	onLogin = async () => {
		const auth = getAuth();
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			return {
				type: 'success',
				token,
				user,
			};
		} catch (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential_1 = GoogleAuthProvider.credentialFromError(error);
			return {
				type: 'error',
				errorCode,
				errorMessage,
				email,
				credential_1,
			};
		}
	};

	signOut = async () => {
		const auth = getAuth();
		try {
			await signOut(auth);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};
}

// DB Service

export class FirebaseDBService {
	
	constructor(cloudinary){
		this.cloudinary = cloudinary;
	}
	/* createRecipe 
	 input - recipeData: Object
	 output - true | error (if error)
	 des - to add Recipe data into DB with createdAt and UId
	 */
	createRecipe = async (recipe) => {
		const R_id = 'R' + Date.now();
		recipe['id'] = R_id;
		recipe['createdAt'] = new Date().toISOString();
		recipe['updatedAt'] = new Date().toISOString();

		// Location of Img: recipe.how_to_make[index].cook_image
		for(let i = 0; i < recipe.how_to_make.length; i++) {
			const fileList = recipe.how_to_make[i].cook_image;
			const imgData = await this.cloudinary.uploadFile(fileList);
			recipe.how_to_make[i].cook_image = imgData.url;
		}

		try {
			await setDoc(doc(db, 'recipes', R_id), recipe);
			return true;
		} catch (e) {
			return e;
		}
	};

	/* getRecipeById
		input - id: String
		output - recipe: Object | false (if not founded)
	*/

	getRecipeById = async (id) => {
		const recipeRef = collection(db, 'recipes');
		const q = query(recipeRef, where('id', '==', id));
		try {
			let recipe; // undefined (default)
			const snapshot = await getDocs(q);
			snapshot.forEach((doc) => {
				recipe = doc.data();
			});
			if (!recipe) return false;
			else return recipe;
		} catch (e) {
			console.log(e);
			return false;
		}
	};


	updateRecipe = async (id, recipe) => {
		const beforeRecipe = await this.getRecipeById(id);
		if(!beforeRecipe) return false;

		// update from latest info to past info
		Object.keys(beforeRecipe).forEach(key => {
			if(recipe[key])
				beforeRecipe[key] = recipe[key];
		})
		beforeRecipe.updatedAt = new Date().toISOString();

		// check if img is changed
		for(let i = 0; i < beforeRecipe.how_to_make.length; i++){
			const fileList = beforeRecipe.how_to_make[i].cook_image;
			if(typeof fileList !== String){
				const imgData = await this.cloudinary.uploadFile(fileList);
				beforeRecipe.how_to_make[i].cook_image = imgData.url;
			}
		}
	}

	/* getRecipeByOwner
		input - id: String
		output - recipes: Array[recipe] | false (if not founded)
	*/
	getRecipeByOwner = async (ownerId) => {
		const recipeRef = collection(db, "recipes");
		const q = query(recipeRef, where('owner', "==", ownerId));
		try {
			let recipe; // undefined (default)
			const snapshot = await getDocs(q);
			snapshot.forEach((doc) => {
				console.log(recipe);
				recipe = doc.data();
			});
			if (!recipe) return false;
			else return recipe;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	deleteRecipeById = async (id) => {
		await deleteDoc(doc(db, "recipes", String(id)));
	}


	// for Main Page -> get all Recipes ordered by createdAt
	getAllRecipes = async () => {
		const recipes = []
		const ref = collection(db, "recipes");
		const q = query(ref, orderBy("createdAt", 'desc'));
		const snapshot = await getDocs(q);
		snapshot.forEach(doc => {
			recipes.push(doc.data().createdAt);
		});
		console.log(recipes);
	}

	createRecipe_test = async () => {
		const R_id = 'R' + Date.now();
		const dummy = {
			id: R_id,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			title: 'title 나는 김 한 율 이다',
			owner: "rkdeofuf",
			description: 'des 나는 이 진 이 다',
			category: ['강대렬', '김현수', '이진이', '김한율'],
			people: '4',
			minutes: '123456',
			level: '최상',
			ingredients: [
				{
					ingredient: '재료 이름 뭐로 하냐',
					amount: '0.5T',
				},
				{
					ingredient: '재료 이름 뭐로 하냐 ?',
					amount: '1123T',
				},
			],
			how_to_make: [
				{
					step: 1,
					cooking: '쿠킹입니다잉',
					cook_image: 'cooking_image_url',
				},
				{
					step: 2,
					cooking: '쿠킹 2입니다잉',
					cook_image: 'cooking_image_url',
				},
			],
		};

		await setDoc(doc(db, 'recipes', R_id), dummy);
		// try {
		// 	const docRef = await addDoc(collection(db, 'users'), dummy);

		// 	console.log('Document written with ID: ', docRef.id);
		// } catch (e) {
		// 	console.error('Error adding document: ', e);
		// }
		for(let i = 0; i < dummy.how_to_make.length; i++) {
			const fileList = dummy.how_to_make[i].cook_image;
			console.log(fileList);
			// const imgData = await this.cloudinary.uploadFile(fileList);
			// recipe.how_to_make[i].cook_image = imgData.url;
		}
	};

	getRecipe = async () => {
		const recipeRef = collection(db, 'recipes');
		const q = query(recipeRef, where('people', '==', '4'));
		const snapshot = await getDocs(q);
		console.log(snapshot);
		snapshot.forEach((doc) => {
			console.log('id: ', doc.id, 'data: ', doc.data());
		});
	};
}

export class cloudinaryService {
	uploadFile = async (files) => {
		const formdata = new FormData();
		
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			formdata.append('file', file);
			formdata.append('upload_preset', UPLOAD_PRESET);
			for (let k of formdata.keys()) console.log(k);
			for (let v of formdata.values()) console.log(v);
		}

		const fileRes = await axios({
			url: cloudinaryUrl,
			method: 'POST',
			data: formdata,
		});
		console.log(fileRes.data);

		return fileRes.data;
	};
}






// NOTE - this Class is for Opensource Class only
// Don't need to use this funciton by people from 캡스톤 3.

export class pbDataService {
	airportCongestion = () => {
		const BASE_URL = 'https://api.odcloud.kr/api';
		const apiUrl = '/getAPRTPsgrCongestion/v1/aprtPsgrCongestion​';
		const query =
			'?page=1&perPage=10&serviceKey=5o98I9f6U51CEt3QoSMO86RI%2Bc%2FlHeEuuc52Vv1PaRbOqiN%2B0dbR6oOKaDBCmJV1LDFab8uVOnL9SN7AX%2BWc6A%3D%3D';
		const reqUrl = BASE_URL + apiUrl + query;
		axios({
			url: reqUrl,
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'5o98I9f6U51CEt3QoSMO86RI+c/lHeEuuc52Vv1PaRbOqiN+0dbR6oOKaDBCmJV1LDFab8uVOnL9SN7AX+Wc6A==',
			},
		}).then((res) => {
			console.log(res);
		});
	};
}

// const abc = new pbDataService();

// abc.airportCongestion();
