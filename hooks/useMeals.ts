import { Meal } from "@/types/Meal";
import axios from "axios";

export const useMeals = () => {
    const makeRequest = async (options:any) => {  
      try {
        if (options.authenticated) {
          options.config.headers = {
            ...options.config.headers,
          };
        }
        const response = await axios(options.config);
        const { data } = response;
        return data;
      } catch (error:any) {
        if (axios.isAxiosError(error) && error.response) {
          console.log('error')
          return error.response.data;
        }
        return error.message;
      }
        };
    const getMeals = async () => {
        const options = {
            config: {
            method: 'GET',
            url: `/api/meals`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }
    const getMeal = async (id:string) => {
        const options = { 
            config: {
            method: 'GET',
            url: `/api/meals/${id}`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }

    const likeMeal  = async (id:number) => {
        const options = {
            config: {
            method: 'POST',
            url: `/api/meals-like/${id}`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }

    const unlikeMeal  = async (id: number) => {
        const options = {
            config: {
            method: 'DELETE',
            url: `/api/meals-like/${id}`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }
        
    const getMealsLike = async () => {
        const options = {
            config: {
            method: 'GET',  
            url: `/api/meals-like`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }

    const deleteMeal = async (id: string) => {
        const options = {
            config: {
            method: 'DELETE',
            url: `/api/meals/${id}`,
            },
            authenticated: true,
        };
        return await makeRequest(options);
        }   

        const createMeal = async (meal:Meal) => {
            const ingredientPromises = meal.mealIngredients.map((mealIngredient) => {
              const option = {
                config: {
                  method: 'GET',
                  url: `/api/ingredients?name=${mealIngredient.ingredientName}`,
                },
                authenticated: true,
              }
          
              return makeRequest(option).then((ingredients) => {
                if (ingredients.length === 0) {
                  const option = {
                    config: {
                      method: 'POST',
                      url: `/api/ingredients`,
                      data: {id:mealIngredient.id ,name: mealIngredient.ingredientName},
                    },
                    authenticated: true,
                  }
                  return makeRequest(option).then((ingredient) => {
                    mealIngredient.ingredientId = ingredient.id;
                  })
                } else {
                  mealIngredient.ingredientId = ingredients[0].id;
                }
              })
            });
          
            await Promise.all(ingredientPromises);
          
            const options = {
              config: {
                method: 'POST',
                url: `/api/meals`,
                data: meal,
              },
              authenticated: true,
            };
            return await makeRequest(options);
          }
          
          const editMeal = async (meal: any) => {
            const ingredientPromises = meal.mealIngredients.map((mealIngredient:any) => {
              const optionx = {
                config: {
                  method: 'GET',
                  url: `/api/ingredients?name=${mealIngredient.ingredientName}`,
                },
                authenticated: true,
              }
          
              return makeRequest(optionx).then((ingredientsc) => {
                if (ingredientsc.length === 0) {
                  const option = {
                    config: {
                      method: 'POST',
                      url: `/api/ingredients`,
                      data: {name: mealIngredient.ingredientName},
                    },
                    authenticated: true,
                  }
                  return makeRequest(option).then((ingredientAdded) => {
                    mealIngredient.ingredientId = ingredientAdded.id;
                  })
                } else {
                  mealIngredient.ingredientId = ingredientsc[0].id;
                }
              })
            });
          
            await Promise.all(ingredientPromises);
          
            const options = {
              config: {
                method: 'PUT',
                url: `/api/meals/${meal.id}`,
                data: meal,
              },
              authenticated: true,
            };
            return await makeRequest(options);
          }
          
    return { getMeals, getMeal, createMeal, likeMeal, unlikeMeal, getMealsLike, deleteMeal, editMeal};
    }