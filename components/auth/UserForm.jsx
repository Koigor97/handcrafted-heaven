import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImagePicker from "../common/ImagePicker";

export function UserForm({ errors }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-medium">User Information</legend>
      <div className="grid gap-2">
        <Label htmlFor="name">
          Name<span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Max"
          className="h-8"
          name="name"
          required
        />
        {errors?.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">
          Email<span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          required
          placeholder="m@example.com"
          className="h-8"
        />
        {errors?.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">
          Password<span className="text-red-500">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          className="h-8"
          name="password"
          required
        />
        {errors?.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number<span className="text-red-500">*</span></Label>
        <Input id="phone" type="tel" className="h-8" name="phone" required placeholder='XXX-XXX-XXXX or (XXX) XXX-XXXX'/>
        {errors?.phone && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </div>
      <div className="grid gap-2">
        <ImagePicker label={"User Profile"} name={"user_image_url"} />
      </div>
    </fieldset>
  );
}
