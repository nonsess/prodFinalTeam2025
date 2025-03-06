import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function CitySelect({ register }) {
    return (
        <Select {...register("location", { required: true })}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="Москва">Москва</SelectItem>
                    <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                    <SelectItem value="Казань">Казань</SelectItem>
                    <SelectItem value="Екатеринбург">Екатеринбург</SelectItem>
                    <SelectItem value="Новосибирск">Новосибирск</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}