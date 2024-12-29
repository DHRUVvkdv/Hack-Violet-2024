// src/pages/MenstrualCyclePage/index.js

import React, { useState } from 'react'
import './index.scss'

import ExerciseFlashcard from '../exerciseFlashcard'
import FoodFlashcard from '../foodFlashcard'

import Weightlift from './weightlift.jpeg'
import Running from './run.jpeg'
import YogaImage from './yoga.jpeg' // Import the image

import FoodImage from './food.jpeg'
import Vegan from './vegan.jpeg'
import Meat from './meat.jpeg'

import TopNav from '../navbar/TopNav'

const MenstrualCyclePage = () => {
  const phases = ['Menstruation', 'Follicular', 'Ovulation', 'Luteal']
  const [selectedPhase, setSelectedPhase] = useState(null)

  const strengthData = {
    Menstruation: 'During the menstrual phase, your body may be more fatigued and sensitive. It is essential to prioritize self-care and not push yourself too hard. Consider focusing on lighter strength training sessions that emphasize full-body movements and muscle engagement without excessive intensity. Use this time to work on stability and mobility exercises. Incorporate exercises such as bodyweight squats, lunges, and gentle core work. Allow for longer rest periods between sets and listen to your body`s` cues for recovery.',
    Follicular: 'As you transition into the follicular phase, energy levels typically rise. This is an opportune time to engage in more dynamic and challenging strength training workouts. Incorporate compound movements that target multiple muscle groups simultaneously. Focus on increasing weights and intensity gradually. High-intensity interval training (HIIT) or circuit training can be effective during this phase to enhance cardiovascular fitness and strength. Embrace exercises like deadlifts, squats, bench presses, and incorporate explosive movements to take advantage of heightened energy levels.',
    Ovulation: 'During the ovulatory phase, estrogen and testosterone levels peak, providing a boost in strength and endurance. Take advantage of this by incorporating more demanding strength training exercises. Challenge yourself with heavier weights and lower rep ranges to promote muscle hypertrophy. Compound movements and powerlifting exercises, such as deadlifts, squats, and overhead presses, can be particularly effective during this phase. Focus on maintaining proper form and control throughout each repetition.',
    Luteal: 'As you enter the luteal phase, you may experience increased PMS symptoms and fatigue. Modify your strength training routine to prioritize stability and control. Consider incorporating more bodyweight exercises, resistance band workouts, and isometric holds. This phase is suitable for targeting specific muscle groups with isolation exercises and incorporating yoga or Pilates movements to promote flexibility and alleviate tension. Be attentive to your bodys signals, and if needed, decrease the overall training volume while maintaining a focus on quality movement.',
  }

  const yogaData = {
    Menstruation: 'Focus: During your period, the body is often fatigued and may experience discomfort. The emphasis is on self-care and gentleness. Yoga Practice: Opt for restorative yoga, which involves gentle, supported poses to promote relaxation. Incorporate slow, mindful movements to ease tension. Poses to Try: Child Pose, Supported Bridge Pose with props, Legs Up the Wall, and gentle seated forward bends.',
    Follicular: 'Focus: Energy levels rise as the body prepares for ovulation. The focus here is on building strength, flexibility, and enhancing mood. Yoga Practice: Engage in more dynamic and invigorating sequences. Include sun salutations, standing poses like Warrior series, and flowing movements to boost vitality. Poses to Try: Sun Salutations, Warrior Poses, Downward Dog, and inversions like Headstand or Handstand (if you are comfortable with them).',
    Ovulation: 'Focus: This phase is marked by increased energy and a sense of openness. Emphasize balance, expansion, and deeper stretching. Yoga Practice: Explore balancing poses that connect mind and body. Incorporate heart-opening postures and deeper stretches. Poses to Try: Tree Pose, Camel Pose, Dancers Pose, and backbends like Cobra or Upward-Facing Dog.',
    Luteal: 'Focus: As the body prepares for menstruation, there may be an increase in emotional and physical symptoms. Prioritize calming and grounding practices. Yoga Practice: Include yin and restorative yoga to ease tension. Focus on hip-opening poses and forward bends to promote relaxation and stress relief. Poses to Try: Pigeon Pose, Seated Forward Bend, Reclining Bound Angle Pose, and supported twists.',
  }

  const cardioData = {
    Menstruation: 'During the menstrual phase, opt for low-impact cardio activities to support the body. Consider activities like brisk walking, cycling, or swimming. Focus on maintaining a moderate intensity to enhance blood flow without excessive strain. Listen to your body and choose activities that feel comfortable and supportive.',
    Follicular: 'As energy levels increase in the follicular phase, incorporate more dynamic and aerobic cardio exercises. Engage in activities like running, dancing, or high-intensity interval training (HIIT) to boost cardiovascular fitness. Challenge yourself with varied and enjoyable workouts to capitalize on heightened energy levels.',
    Ovulation: 'During ovulation, take advantage of increased endurance and stamina. Include cardio workouts that elevate the heart rate and promote cardiovascular health. Activities like running, cycling, and group fitness classes can be effective. Experiment with longer duration and varied intensities to enhance overall endurance.',
    Luteal: 'As you enter the luteal phase, be mindful of potential fatigue and mood changes. Opt for lower-impact cardio exercises such as brisk walking, cycling, or elliptical training. Focus on maintaining a steady pace to support cardiovascular health without placing excessive stress on the body. Listen to your bodys cues and choose activities that feel nurturing.',
  };


  const foodData = {
    Veg: 'Information about vegetarian food...',
    Vegan: 'Information about vegan food...',
    NonVegetarian: 'Information about non-vegetarian food...',
  }

  const generalFoodData = {
    Menstruation:
      'During your period, focus on replenishing iron and energy levels. Include foods rich in iron, such as lean meats, fish, spinach, and legumes. Hydration is crucial, so drink plenty of water and consider herbal teas. Incorporate foods high in omega-3 fatty acids, like flaxseeds and walnuts, to help reduce inflammation and support mood. Opt for warm, comforting foods like soups and stews, and consider incorporating magnesium-rich foods, such as dark chocolate and bananas, to ease muscle cramps.',
    Follicular: 'As energy levels rise, focus on a balanced diet that supports increased activity. Include lean proteins, whole grains, and a variety of colorful fruits and vegetables. Choose complex carbohydrates for sustained energy and incorporate foods rich in vitamin B, such as poultry, eggs, and leafy greens, to support the nervous system. Stay hydrated, and consider adding a variety of seeds, like chia and pumpkin seeds, for additional nutrients.',
    Ovulation: 'With increased energy and metabolic rate, emphasize nutrient-dense foods. Include lean proteins, such as fish and poultry, for muscle support. Incorporate complex carbohydrates, like quinoa and sweet potatoes, for sustained energy. Boost your intake of antioxidants from colorful fruits and vegetables. Include foods high in zinc, such as nuts and seeds, to support immune function. Stay hydrated with water and herbal teas, and consider incorporating probiotic-rich foods like yogurt for gut health.',
    Luteal: 'During the luteal phase, address potential cravings and mood swings with a balanced and supportive diet. Include complex carbohydrates, such as whole grains and legumes, to regulate blood sugar levels and alleviate PMS symptoms. Consume foods rich in calcium, like dairy or fortified plant-based alternatives, to support bone health. Incorporate magnesium-rich foods, such as leafy greens and almonds, to help with muscle relaxation. Stay hydrated and consider herbal teas for additional comfort. Limit caffeine and refined sugars to help manage mood swings and energy levels.',
  }

  const mealFoodData = {
    Menstruation: `
      - Breakfast: Spinach and feta omelet with whole grain toast
      - Snack: Banana and a handful of walnuts
      - Lunch: Lentil soup with a side of steamed broccoli
      - Snack: Greek yogurt with flaxseeds and berries
      - Dinner: Grilled salmon with quinoa and sautéed spinach
      - Hydration: Water, herbal teas, and warm lemon water throughout the day
    `,
    Follicular: `
      - Breakfast: Smoothie with mixed berries, spinach, Greek yogurt, and chia seeds
      - Snack: Apple slices with almond butter
      - Lunch: Grilled chicken salad with a variety of colorful veggies
      - Snack: Hummus with carrot and cucumber sticks
      - Dinner: Quinoa-stuffed bell peppers with lean ground turkey
      - Hydration: Water with a splash of citrus, and coconut water for electrolytes
    `,
    Ovulation: `
      - Breakfast: Oatmeal topped with sliced bananas, nuts, and a drizzle of honey
      - Snack: Greek yogurt parfait with granola and fresh berries
      - Lunch: Grilled fish tacos with avocado and cabbage slaw
      - Snack: Mixed nuts and dried fruits
      - Dinner: Baked sweet potato with chickpea curry
      - Hydration: Water infused with cucumber and mint, and green tea
    `,
    Luteal: `
      - Breakfast: Whole grain toast with avocado and poached egg
      - Snack: Cottage cheese with pineapple chunks
      - Lunch: Quinoa salad with mixed vegetables and grilled tofu
      - Snack: Dark chocolate and a handful of almonds
      - Dinner: Lentil and vegetable stir-fry with brown rice
      - Hydration: Herbal teas like chamomile or ginger, and water with a slice of lemon
    `,
  };


  const veganFoodData = {
    Menstruation: `
      During your period, it's essential to focus on replenishing iron and energy levels with plant-based options. Start your day with a hearty bowl of oatmeal topped with chia seeds, berries, and a dollop of almond butter. For lunch, enjoy a lentil and vegetable curry served with quinoa. Snack on a handful of pumpkin seeds and dried apricots for an iron boost. Dinner can be a comforting sweet potato and black bean chili, rich in fiber and nutrients. Stay hydrated with water, herbal teas, and warm lemon water to ease muscle cramps.
    `,
    Follicular: `
      As energy levels rise during the follicular phase, opt for a balanced and protein-rich vegan diet. Begin your day with a protein-packed smoothie featuring plant-based protein powder, almond milk, and a variety of fruits. For lunch, enjoy a colorful chickpea and vegetable stir-fry over brown rice. Snack on hummus with cucumber and carrot sticks for a satisfying midday snack. Dinner can be a quinoa salad with mixed greens, cherry tomatoes, and avocado. Stay hydrated with water and coconut water to support your active lifestyle.
    `,
    Ovulation: `
      Emphasize nutrient-dense vegan foods during the ovulatory phase to support increased energy and metabolic rate. Start your morning with a tofu scramble loaded with spinach, tomatoes, and nutritional yeast. Snack on a smoothie bowl with acai, mixed berries, and a sprinkle of hemp seeds. For lunch, savor a quinoa and black bean salad with avocado and lime dressing. Enjoy a variety of colorful fruits and vegetables as snacks throughout the day. Stay well-hydrated with water and herbal teas, and consider adding fermented foods like kimchi for gut health.
    `,
    Luteal: `
      During the luteal phase, address potential cravings and mood swings with a balanced and nourishing vegan diet. Begin your day with whole grain toast topped with avocado and tomato. Snack on a bowl of mixed nuts and dried fruits for sustained energy. For lunch, try a lentil and sweet potato curry served over brown rice. Include calcium-rich plant-based sources like fortified almond milk and tofu in your meals. Hydrate with herbal teas like chamomile and ginger, and limit caffeine and refined sugars to manage mood swings and energy levels.
    `,
  };

  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase)
  }

  return (
    <div className="menstrual-cycle-page">
      <TopNav />
      <div className="left-element">
        {phases.map((phase) => (
          <button
            key={phase}
            onClick={() => handlePhaseClick(phase)}
            className={selectedPhase === phase ? 'selected' : ''}
          >
            {phase}
          </button>
        ))}
      </div>
      <div className="middle-element">
        <h2 className="exercise-food">Exercise</h2>
        <ExerciseFlashcard
          imageSrc={Weightlift}
          title="Strength Training"
          description={strengthData[selectedPhase]}
          isImageOnLeft={true}
          backgroundColor="#fcf5f1"
        />
        <ExerciseFlashcard
          imageSrc={YogaImage}
          title="Yoga"
          description={yogaData[selectedPhase]}
          isImageOnLeft={false}
          backgroundColor="#f5dada"
        />
        <ExerciseFlashcard
          imageSrc={Running}
          title="Aerobic Exercise"
          description={strengthData[selectedPhase]}
          isImageOnLeft={true}
          backgroundColor="#fcf5f1"
        />
      </div>
      <div className="right-element">
        <h2 exercise-food>Food</h2>
        <p>{foodData[selectedPhase]}</p>
        <FoodFlashcard
          imageSrc={FoodImage}
          title="General Tips"
          description={generalFoodData[selectedPhase]}
          isImageOnLeft={true}
          backgroundColor="#f5dada"
        />
        <FoodFlashcard
          imageSrc={Meat}
          title="Meal Ideas"
          description={mealFoodData[selectedPhase]}
          isImageOnLeft={false}
          backgroundColor="#fcf5f1"
        />
        <FoodFlashcard
          imageSrc={Vegan}
          title="Vegan Suggestions"
          description={veganFoodData[selectedPhase]}
          isImageOnLeft={true}
          backgroundColor="#f5dada"
        />
      </div>
    </div>
  )
}

export default MenstrualCyclePage