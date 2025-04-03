
import { useState, useRef } from "react";
import { useProfiles, Profile } from "@/context/ProfileContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, Briefcase, Tag, Plus, Pencil, Trash2, Mail, Phone, ImageIcon, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfileFormData {
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  profession: string;
  city: string;
  interests: string;
  image: string;
}

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
}

const ProfileForm = ({ initialData = {}, onSubmit, onCancel }: ProfileFormProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: initialData.name || "",
    description: initialData.description || "",
    address: initialData.address || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    profession: initialData.profession || "",
    city: initialData.city || "",
    interests: initialData.interests ? initialData.interests.toString() : "",
    image: initialData.image || "/placeholder.svg",
  });
  
  const [imagePreview, setImagePreview] = useState<string>(initialData.image || "/placeholder.svg");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert to base64 for preview and storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
      toast({
        title: "Image selected",
        description: `${file.name} is ready to upload`,
      });
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        <div className="space-y-4">
          <Label className="text-center block">Profile Image</Label>
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-32 w-32 border-2 border-primary/20 cursor-pointer hover:border-primary transition-colors duration-200"
              onClick={triggerFileInput}>
              <AvatarImage src={imagePreview} alt="Profile preview" className="object-cover" />
              <AvatarFallback className="text-2xl">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3 animate-fade-in"
              onClick={triggerFileInput}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                className="pl-9"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                name="address"
                placeholder="Full address"
                value={formData.address}
                onChange={handleChange}
                className="pl-9"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <div className="relative">
                <Briefcase className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="profession"
                  name="profession"
                  placeholder="Profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="interests">Interests (comma separated)</Label>
            <div className="relative">
              <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="interests"
                name="interests"
                placeholder="e.g. coding, hiking, photography"
                value={formData.interests}
                onChange={handleChange}
                className="pl-9"
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="animate-pulse-gentle">
          {initialData.name ? "Update Profile" : "Add Profile"}
        </Button>
      </DialogFooter>
    </form>
  );
};

const Admin = () => {
  const { profiles, addProfile, updateProfile, deleteProfile, loading } = useProfiles();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const { toast } = useToast();
  
  const handleAddProfile = (formData: ProfileFormData) => {
    // Parse interests from comma-separated string to array
    const interests = formData.interests.split(',')
      .map(interest => interest.trim())
      .filter(Boolean);
      
    addProfile({
      name: formData.name,
      description: formData.description,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      profession: formData.profession,
      city: formData.city,
      interests,
      image: formData.image, // Use uploaded image
      socials: {},
    });
    
    toast({
      title: "Profile Added",
      description: `${formData.name}'s profile has been created successfully.`,
    });
    
    setIsAddDialogOpen(false);
  };
  
  const handleEditProfile = (formData: ProfileFormData) => {
    if (!currentProfile) return;
    
    // Parse interests from comma-separated string to array
    const interests = formData.interests.split(',')
      .map(interest => interest.trim())
      .filter(Boolean);
      
    updateProfile(currentProfile.id, {
      name: formData.name,
      description: formData.description,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      profession: formData.profession,
      city: formData.city,
      interests,
      image: formData.image, // Update image
    });
    
    toast({
      title: "Profile Updated",
      description: `${formData.name}'s profile has been updated successfully.`,
    });
    
    setCurrentProfile(null);
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteProfile = () => {
    if (!currentProfile) return;
    
    deleteProfile(currentProfile.id);
    
    toast({
      title: "Profile Deleted",
      description: `${currentProfile.name}'s profile has been deleted.`,
      variant: "destructive",
    });
    
    setCurrentProfile(null);
    setIsDeleteDialogOpen(false);
  };
  
  const openEditDialog = (profile: Profile) => {
    setCurrentProfile(profile);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (profile: Profile) => {
    setCurrentProfile(profile);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="animate-hover-bounce">
              <Plus className="mr-2 h-4 w-4" />
              Add Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Profile</DialogTitle>
            </DialogHeader>
            <ProfileForm 
              onSubmit={handleAddProfile} 
              onCancel={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-white rounded-md shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Profession</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <TableRow key={profile.id} className="animate-table-row">
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile.image} alt={profile.name} />
                      <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>{profile.city || profile.address}</TableCell>
                  <TableCell>{profile.profession || "-"}</TableCell>
                  <TableCell className="space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => openEditDialog(profile)}
                      className="hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10 transition-colors duration-200" 
                      onClick={() => openDeleteDialog(profile)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No profiles found. Add a new profile to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          {currentProfile && (
            <ProfileForm 
              initialData={{
                ...currentProfile,
                interests: currentProfile.interests?.join(", ") || "",
              }}
              onSubmit={handleEditProfile} 
              onCancel={() => setIsEditDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {currentProfile?.name}'s profile? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProfile}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
