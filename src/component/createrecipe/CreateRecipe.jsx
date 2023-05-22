import React, { useEffect, useRef, useState } from 'react';
import Styles from './createrecipe.module.css';

const Order = ({ step, des, picture, onInput, Cloudinary }) => {
	const [loading, setLoading] = useState(false);
	const desRef = useRef();
	const pictureRef = useRef();

	const onBtnClick = (e) => {
		e.preventDefault();
		pictureRef.current.click();
	};

	const onOrderInput = () => {
		const desVal = desRef.current.value;
		onInput(step, desVal, picture);
	};

	const onPictureChange = (url) => {
		const desVal = desRef.current.value;
		onInput(step, desVal, url);
	};

	const onFileInput = async (e) => {
		setLoading(true);
		const files = pictureRef.current.files;
		console.log(files);
		const fileData = await Cloudinary.uploadFile(files);
		const pictureUrl = fileData.url;
		// console.log(pictureUrl);
		// onFileChange(e)
		onPictureChange(pictureUrl);
		setLoading(false);
	};

	return (
		<div className='order'>
			<div className='order__num'>{step} 단계</div>
			<textarea
				value={des}
				onInput={onOrderInput}
				ref={desRef}
				name='des'
				id='des'
				cols='30'
				rows='10'
				placeholder='예) 소고기는 기름기를 떼어내고 적당한 크기로 썰어주세요.'
			></textarea>
			<div className={Styles.filebtn}>
				{loading ? (
					<div className={Styles.loading}> </div>
				) : (
					<button onClick={onBtnClick} className={Styles.file__btn} >
						{picture ? (
							<img className={Styles.orderImg} alt='orderImg' src={picture} />
						) : (
							<div className={Styles.file__input}>
                <img src="http://res.cloudinary.com/dfvqmpyji/image/upload/v1683640174/uploads/tynufauekqrukjhq8zn1.png" alt="defimg" />
              </div>
						)}
					</button>
				)}

				<input
					onChange={onFileInput}
					type='file'
					accept='image/*'
					ref={pictureRef}
				/>
			</div>
		</div>
	);
};

const Ing = ({ index, onInput, name, unit }) => {
	const nameRef = useRef();
	const unitRef = useRef();

	const onIngInput = () => {
		const nameVal = nameRef.current.value;
		const unitVal = unitRef.current.value;
		onInput(index, nameVal, unitVal);
	};
	return (
		<div className='ing'>
			<input
				value={name}
				onInput={onIngInput}
				ref={nameRef}
				type='text'
				placeholder='재료이름'
			/>
			<input
				value={unit}
				onInput={onIngInput}
				ref={unitRef}
				type='text'
				placeholder='단위 예) 300g, 1/2개'
			/>
		</div>
	);
};

// CreateRecipe
const CreateRecipe = ({ Cloudinary, DBService }) => {

	// useRef -> 레시피 input정보 참조
	const titleRef = useRef();
	const introductionRef = useRef();
	const categoryRefKind = useRef();
	const categoryRefCir = useRef();
	const categoryRefWay = useRef();
	const categoryRefIng = useRef();

	// useState -> 레시피 기록 정보 저장
	const [overview, setOverview] = useState({
		title: '',
		introduction: '',
		category: {
			kind: '',
			circumstance: '',
			way: '',
			ingredient: '',
		},
	});

	const [ingredients, setIngredients] = useState([
		{ name: '감자', unit: '300g 또는 1/2개' },
	]);

	const [orders, setOrders] = useState({
		1: {
			des: '',
			picture: null,
		},
	});

	// setState -> 각 정보의 input에 대해 setState 호출

	const onOrderInput = (step, des, picture) => {
		const newOrder = {};
		Object.keys(orders).forEach((stp) => {
			newOrder[`${stp}`] = { ...orders[`${stp}`] };
		});
		newOrder[`${step}`] = {
			des,
			picture,
		};
		console.log(newOrder);
		setOrders(newOrder);
	};

	const onOrderAdd = () => {
		const newStep = Object.keys(orders).length + 1;
		const newOrder = {};
		Object.keys(orders).forEach((stp) => {
			newOrder[`${stp}`] = { ...orders[`${stp}`] };
		});
		newOrder[`${newStep}`] = {
			des: '',
			picture: null,
		};
		setOrders(newOrder);
	};

	const onOrderRm = () => {
		const rmStep = Object.keys(orders).length;
		const newOrder = {};
		Object.keys(orders).forEach((stp) => {
			if (Number(stp) === rmStep) return;
			else {
				newOrder[`${stp}`] = { ...orders[`${stp}`] };
			}
		});
		console.log(newOrder);
		setOrders(newOrder);
	};

	const onOverviewInput = () => {
		const titleVal = titleRef.current.value;
		const intVal = introductionRef.current.value;
		const kindVal = categoryRefKind.current.value;
		const cirVal = categoryRefCir.current.value;
		const wayVal = categoryRefWay.current.value;
		const ingVal = categoryRefIng.current.value;
		const newOverview = {
			title: titleVal,
			introduction: intVal,
			category: {
				kind: kindVal,
				circumstance: cirVal,
				way: wayVal,
				ingredient: ingVal,
			},
		};
		setOverview(newOverview);
	};

	const onIngredientsInput = (index, name, unit) => {
		const newIng = ingredients.map((v) => {
			return {
				name: v.name,
				unit: v.unit,
			};
		});

		const newIngOrder = { name, unit };
		newIng[index] = newIngOrder;
		console.log(newIng);
		setIngredients(newIng);
	};

	const onIngredientsAdd = () => {
		const newIng = ingredients.map((v) => {
			return {
				name: v.name,
				unit: v.unit,
			};
		});
		newIng.push({ name: '감자', unit: '300g 또는 1/2개' });
		setIngredients(newIng);
	};

	const onIngredientsRm = () => {
		const newIng = ingredients.map((v) => {
			return {
				name: v.name,
				unit: v.unit,
			};
		});
		newIng.pop();
		setIngredients(newIng);
	};

	// For interaction with DB, Cloud service
	const onCreateRecipe = async () => {
		// for(let i =0; i< 30; i++)
		await DBService.createRecipe_test();
	}

	const onDeleteClick = async () => {
		// await DBService.deleteRecipe('R1684409592182');
		// const recipes = await DBService.getRecipeByOwner("rkdeofuf");
		await DBService.getAllRecipes();
	}

	return (
		<div className='container'>
			<div className='create'>
				<div className='title'>레시피 작성하기</div>
				<div className='overview'>
					<div className='overview__title'>
						<span>레시피 제목</span>
						<input
							onInput={onOverviewInput}
							ref={titleRef}
							type='text'
							name='title'
							id='title'
						/>
					</div>
					<div className='overview__introduction'>
						<span>요리소개</span>
						<input
							onInput={onOverviewInput}
							type='text'
							ref={introductionRef}
							name='introduction'
							id='introduction'
						/>
					</div>
					<div className='overview__category'>
						<span>카테고리</span>
						<div className='category__bar'>
							<select
								onInput={onOverviewInput}
								ref={categoryRefKind}
								name='kinds'
								id='kinds'
							>
								<option value=''>종류별</option>
								<option value='중식'>중식</option>
								<option value='양식'>양식</option>
								<option value='한식'>한식</option>
								<option value='일식'>일식</option>
							</select>
							<select
								onInput={onOverviewInput}
								ref={categoryRefCir}
								name='circumstance'
								id='circumstance'
							>
								<option value=''>상황별</option>
								<option value='야식'>야식</option>
								<option value='아침'>아침</option>
								<option value='점심'>점심</option>
								<option value='저녁'>저녁</option>
								<option value='디저트'>디저트</option>
							</select>
							<select
								onInput={onOverviewInput}
								ref={categoryRefWay}
								name='way'
								id='way'
							>
								<option value=''>방법별</option>
								<option value='튀김'>튀김</option>
								<option value='구이'>구이</option>
								<option value='후레쉬'>후레쉬</option>
							</select>
							<select
								onInput={onOverviewInput}
								ref={categoryRefIng}
								name='ingredient'
								id='ingredient'
							>
								<option value=''>재료별</option>
								<option value='강대렬'>강대렬</option>
								<option value='김현수'>김현수</option>
								<option value='내 이름은 김 한 율'>내 이름은 김 한 율</option>
								<option value='이진이'>이진이</option>
							</select>
						</div>
					</div>
				</div>
				<div className='ingredients'>
					<div className='ingredients__title'>
						<span>재료</span>
						<span>
							재료가 남거나 부족하지 않도록 정확한 계량정보를 적어주세요
						</span>
					</div>
					<div className='ingredient__collection'>
						{ingredients.map((v, index) => {
							const ingname = ingredients[index].name;
							const ingunit = ingredients[index].unit;
							console.log(ingunit);
							return (
								<Ing
									key={index}
									index={index}
									onInput={onIngredientsInput}
									name={ingname}
									unit={ingunit}
								/>
							);
						})}
					</div>
					<div className='ing__addbtn' onClick={onIngredientsAdd}>
						<div className='btnimg'>+</div>
						<span>추가</span>
					</div>
					<div className='ing__rmbtn' onClick={onIngredientsRm}>
						<div className='btnimg'>-</div>
						<span>제거</span>
					</div>
				</div>
				<div className='order'>
					<div className='order__title'>요리순서</div>
					{Object.keys(orders).map((v, index) => {
						const step = v;
						const des = orders[`${v}`].des;
						const picture = orders[`${v}`].picture;
						return (
							<Order
								key={index}
								step={step}
								des={des}
								picture={picture}
								onInput={onOrderInput}
								Cloudinary={Cloudinary}
							/>
						);
					})}

					<div onClick={onOrderAdd} className='order__addbtn'>
						<div className='btnimg'>+</div>
						<span>추가</span>
					</div>
					<div onClick={onOrderRm} className='order__rmbtn'>
						<div className='btnimg'>+</div>
						<span>제거</span>
					</div>
				</div>
				<button className='submit' onClick={onCreateRecipe}>등록하기</button>
				<button className='delete' onClick={onDeleteClick}>레시피 삭제</button>
			</div>
		</div>
	);
};

export default CreateRecipe;
