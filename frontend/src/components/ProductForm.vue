<template>
  <Dialog
    :title="props.mode === 'edit' ? 'Edit Product' : 'Add Product'"
    closable
    size="md"
    @close="$emit('close')"
  >
    <template #default>
      <div class="p-4 space-y-4">
        <label class="block mb-3" for="productName">Product Name</label>
        <input
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          id="productName"
          v-model="formData.name"
        />

        <label class="block mb-3" for="productDescription">Description</label>
        <textarea
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          id="productDescription"
          v-model="formData.description"
        ></textarea>

        <label class="block mb-3" for="productIngredient">Ingredients</label>
        <textarea
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          id="productIngredient"
          v-model="formData.ingredients"
        ></textarea>

        <label class="block mb-3" for="productPrice">Price</label>
        <input
          type="number"
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          id="productPrice"
          v-model="formData.price"
        />

        <label class="block mb-3" for="productCategory">Category</label>
        <select
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          id="productCategory"
          v-model="formData.categoryId"
        >
          <option disabled :value="undefined">Please select</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <label class="block mb-3" for="productImageName">Image Name</label>
        <input
          class="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          id="productImageName"
          v-model="formData.imageName"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-4">
        <button
          @click="$emit('close')"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-semibold transition"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="!isFormValid"
          class="px-4 py-2 rounded font-semibold transition text-white"
          :class="
            isFormValid ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-300 cursor-not-allowed'
          "
        >
          Submit
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { CreateProductPayload } from '@/types/product'
import { useMessageStore } from '@/stores/messageStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { storeToRefs } from 'pinia'
import { useGetCategories } from '@/composable/category/useGetCategories'
import { useGetProduct } from '@/composable/product/useGetProduct'
import { useUpdateProduct } from '@/composable/product/useUpdateProduct'
import { useCreateProduct } from '@/composable/product/useCreateProduct'

const message = useMessageStore()
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { fetch: getCategories } = useGetCategories()
const { fetch: updateProduct } = useUpdateProduct()
const { fetch: createProduct } = useCreateProduct()

const props = defineProps<{
  mode: 'add' | 'edit'
  productId?: number
}>()

const formData = ref<CreateProductPayload>({
  name: '',
  categoryId: undefined,
  price: 0,
  description: '',
  ingredients: '',
  imageName: '',
})

const emit = defineEmits(['close'])

const isFormValid = computed(() => {
  const f = formData.value
  return f.name && f.categoryId && f.price && f.description && f.ingredients && f.imageName
})

const handleSubmit = async () => {
  if (
    !formData.value.name ||
    !formData.value.categoryId ||
    !formData.value.price ||
    !formData.value.description ||
    !formData.value.ingredients ||
    !formData.value.imageName
  ) {
    message.show('Please fill in all fields.', 'error')
    return
  }

  if (props.mode === 'edit' && props.productId !== undefined) {
    await updateProduct(props.productId, formData.value)
    message.show('Product updated successfully', 'success')
  } else {
    await createProduct(formData.value)
    message.show('Product created successfully', 'success')
  }
  emit('close')
}

const { fetch: getProduct } = useGetProduct()

onMounted(async () => {
  if (!categories.value.length) getCategories()

  if (props.mode === 'edit' && props.productId !== undefined) {
    const product = await getProduct(props.productId)
    if (product) {
      const { name, categoryId, price, description, ingredients, imageName } = product
      formData.value = { name, categoryId, price, description, ingredients, imageName }
    }
  }
})
</script>
