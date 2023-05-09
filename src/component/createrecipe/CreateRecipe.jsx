import React from 'react';
import Styles from './createrecipe.module.css';

const CreateRecipe = () => {
	return (
		<div className='container'>
			<div className='create'>
				<div className='title'>레시피 작성하기</div>
				<div className='summary'>
					<div className='summary__title'>
						<span>레시피 제목</span>
						<input type='text' name='title' id='title' />
					</div>
					<div className='summary__introduction'>
						<span>요리소개</span>
						<input type='text' name='title' id='title' />
					</div>
          <div className="summary__category">
            <span>카테고리</span>
            <div className="category__bar">
              <select name="kinds" id="kinds">
                <option value="">종류별</option>
              </select>
              <select name="circumstance" id="circumstance">
                <option value="">상황별</option>
              </select>
              <select name="way" id="way">
                <option value="">방법별</option>
              </select>
              <select name="ingredient" id="ingredient">
                <option value="">재료별</option>
              </select>
            </div>
          </div>
				</div>
				<div className='ingredients'></div>
				<div className='order'></div>
			</div>
		</div>
	);
};

export default CreateRecipe;
