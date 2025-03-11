import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from './ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import classNames from 'classnames';
import styles from './burger-ingredients.module.css';

interface Ingredient {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

interface BurgerIngredientsProps {
  ingredients: Ingredient[];
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = useState('bun');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIngredientClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeModal = () => {
    setSelectedIngredient(null);
  };

  const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
  const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');
  const mains = ingredients.filter(ingredient => ingredient.type === 'main');

  return (
    <section className={classNames(styles.ingredients)}>
      <h1 className={classNames('text', 'text_type_main-large', 'mt-10', 'mb-5')}>
        Соберите бургер
      </h1>

      <div className={classNames(styles.tabs)}>
        <Tab
          value="bun"
          active={currentTab === 'bun'}
          onClick={() => handleTabClick('bun')}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === 'sauce'}
          onClick={() => handleTabClick('sauce')}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === 'main'}
          onClick={() => handleTabClick('main')}
        >
          Начинки
        </Tab>
      </div>

      <div className={classNames(styles.ingredientsList)}>
        <h2 id="bun" className={classNames('text', 'text_type_main-medium', 'mt-10', 'mb-6')}>
          Булки
        </h2>
        <div className={classNames(styles.ingredientsSection)}>
          {buns.map(bun => (
            <IngredientCard
              key={bun._id}
              name={bun.name}
              price={bun.price}
              image={bun.image}
              onClick={() => handleIngredientClick(bun)}
            />
          ))}
        </div>

        <h2 id="sauce" className={classNames('text', 'text_type_main-medium', 'mt-10', 'mb-6')}>
          Соусы
        </h2>
        <div className={classNames(styles.ingredientsSection)}>
          {sauces.map(sauce => (
            <IngredientCard
              key={sauce._id}
              name={sauce.name}
              price={sauce.price}
              image={sauce.image}
              onClick={() => handleIngredientClick(sauce)}
            />
          ))}
        </div>

        <h2 id="main" className={classNames('text', 'text_type_main-medium', 'mt-10', 'mb-6')}>
          Начинки
        </h2>
        <div className={classNames(styles.ingredientsSection)}>
          {mains.map(main => (
            <IngredientCard
              key={main._id}
              name={main.name}
              price={main.price}
              image={main.image}
              onClick={() => handleIngredientClick(main)}
            />
          ))}
        </div>
      </div>

      {selectedIngredient && (
        <Modal onClose={closeModal} title="Детали ингредиента">
          <IngredientDetails
            ingredient={{
              image: selectedIngredient.image,
              name: selectedIngredient.name,
              calories: selectedIngredient.calories,
              proteins: selectedIngredient.proteins,
              fat: selectedIngredient.fat,
              carbohydrates: selectedIngredient.carbohydrates,
            }}
          />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;