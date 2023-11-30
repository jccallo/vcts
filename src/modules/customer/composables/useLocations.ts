import { Department, District, Pluck, Province } from '@/interfaces'
import { useDepartments, useDistricts, useProvinces } from '@/services'
import { reactive } from 'vue'

interface State<T> {
   departments?: T[],
   provinces?: T[],
   districts?: T[],
}

const locations = reactive<State<Pluck>>({})

export const useLocations = () => {
   const { departments, getAllDepartments } = useDepartments()
   const { provinces, getAllProvincesByDepartment } = useProvinces()
   const { districts, getAllDistrictsByProvince } = useDistricts()

   const getDepartments = async () => {
      await getAllDepartments('1', '25')
      locations.departments = departments.list?.map((department: Department) => ({
         id: department.id,
         name: department.name,
      }))
   }

   const getProvinces = async (id: number) => {
      await getAllProvincesByDepartment(id, '1', '196')
      locations.provinces = provinces.list?.map((province: Province) => ({
         id: province.id,
         name: province.name,
      }))
   }

   const getDistricts = async (id: number) => {
      await getAllDistrictsByProvince(id, '1', '1874') // '1', '1874'
      locations.districts = districts.list?.map((district: District) => ({
         id: district.id,
         name: district.name,
      }))
   }

   return {
      locations,
      getDepartments,
      getProvinces,
      getDistricts,
   }
}
