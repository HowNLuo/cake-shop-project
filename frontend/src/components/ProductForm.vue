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
import { useProductStore } from '@/stores/productStore'
import type { CreateProductPayload, Product } from '@/types/product'
import { useMessageStore } from '@/stores/messageStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { storeToRefs } from 'pinia'

const message = useMessageStore()
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

const props = defineProps<{
  mode: 'add' | 'edit'
  product?: Product
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

  if (props.mode === 'edit' && props.product) {
    await productStore.updateProduct(props.product.id, formData.value)
    message.show('Product updated successfully', 'success')
  } else {
    await productStore.createProduct(formData.value)
    message.show('Product created successfully', 'success')
  }
  emit('close')
}

onMounted(() => {
  if (props.mode === 'edit' && props.product) {
    const { name, categoryId, price, description, ingredients, imageName } = props.product
    formData.value = { name, categoryId, price, description, ingredients, imageName }
  }
  if (!categories.value.length) {
    categoryStore.getCategories()
  }
})
</script>
