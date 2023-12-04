<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import Spinner from '@/components/Spinner.vue';
import Header from '@/components/Header.vue'

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    password_confirmation: Yup.string().required('password confirmation is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { first_name, last_name, email, password, password_confirmation } = values;

    return authStore.register(first_name, last_name, email, password, password_confirmation)
        .catch(errorResponse => {
			const errors = {};
			errors.apiError = errorResponse.data.message;
			
			if(Object.prototype.hasOwnProperty.call(errorResponse.data, 'errors')) {
				let errorFields = Object.keys(errorResponse.data.errors);
				
				// insert laravel errors
				errorFields.map(field => {
					errors[field] = errorResponse.data.errors[field][0];
				});
			}
			
			setErrors(errors);
		});
}
</script>

<template>
  <div class="bg-white">
    <!--header-->
      <Header />
    <!--end header -->
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
        
          
          
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create account</h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form class="space-y-6"  @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
              <div class="flex w-full gap-4">
                  <div class="w-1/2">
                    <label for="first_name" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    <div class="mt-2">
                      <Field id="first_name" name="first_name" type="text" :class="{ 'is-invalid': errors.first_name }" autocomplete="first_name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      <div class="text-danger">{{errors.first_name}}</div>
                    </div>
                  </div>
                  <div class="w-1/2">
                    <label for="last_name" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                    <div class="mt-2">
                      <Field id="last_name" name="last_name" type="text" :class="{ 'is-invalid': errors.last_name }" autocomplete="last_name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      <div class="text-danger">{{errors.last_name}}</div>
                    </div>
                  </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                  <Field id="email" name="email" type="email" :class="{ 'is-invalid': errors.email }" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <div class="text-danger">{{errors.email}}</div>
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div class="mt-2">
                  <Field id="password" name="password" type="password" :class="{ 'is-invalid': errors.password }" autocomplete="off" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <div class="text-danger">{{errors.password}}</div>
                </div>
              </div>
                  
              <div>
                <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                <div class="mt-2">
                  <Field id="password_confirmation" name="password_confirmation" type="password" :class="{ 'is-invalid': errors.password_confirmation }" autocomplete="off" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <div class="text-danger">{{errors.password_confirmation}}</div>
                </div>
              </div>
                  
              <div v-if="errors.apiError" class="alert alert-danger mt-2 mb-0">{{errors.apiError}}</div>

              <div>
                <button type="submit" :disabled="isSubmitting" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <span v-show="isSubmitting"><spinner /></span>
                    Create Account
                </button>
              </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</a>
            </p>
          </div>
       </div>
          
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
}
</script>