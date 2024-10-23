import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "@/components/ui/label";
import ImagePicker from "../common/ImagePicker";

export default function ArtisanForm({ errors }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-medium">Artisan Information</legend>
      <div className="grid gap-2">
        <Label htmlFor="shop_name">
          Shop Name<span className="text-red-500">*</span>
        </Label>
        <Input
          id="shop_name"
          placeholder="Sam's Woodwork"
          className="h-8"
          name="shop_name"
          required
        />
        {errors?.shop_name && (
          <p className="text-sm text-red-500">{errors.shop_name}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="shop_description">
          Shop Description<span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="shop_description"
          placeholder="Type your shop description"
          name="shop_description"
          required
        />
        {errors?.shop_description && (
          <p className="text-sm text-red-500">{errors.shop_description}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" />
      </div>
      <div className="grid gap-2">
        <ImagePicker label={"Shop Logo"} name={"shop_logo_url"} />
        {errors?.shop_logo_url && (
          <p className="text-sm text-red-500">{errors.shop_logo_url}</p>
        )}
      </div>
    </fieldset>
  );
}