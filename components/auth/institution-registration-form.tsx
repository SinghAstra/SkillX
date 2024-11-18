"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import ProgressSteps from "./progress-steps";

const steps = [
  { title: "Institution", description: "Basic details" },
  { title: "Contact", description: "Contact info" },
  { title: "Admin", description: "Admin details" },
  { title: "Documents", description: "Upload files" },
];

const institutionTypes = [
  { value: "university", label: "University" },
  { value: "college", label: "College" },
  { value: "technical", label: "Technical Institute" },
  { value: "research", label: "Research Institution" },
];
const InstitutionRegistrationForm = ({ form, currentStep, onStepChange }) => {
  const formSteps = {
    1: <BasicDetails form={form} />,
    2: <ContactInformation form={form} />,
    3: <AdminDetails form={form} />,
    4: <DocumentUpload form={form} />,
  };

  return (
    <div className="space-y-8">
      <ProgressSteps currentStep={currentStep} steps={steps} />

      <Card className="p-6 mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {formSteps[currentStep]}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onStepChange(currentStep - 1)}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (currentStep === 4) {
                form.handleSubmit((data) => console.log(data))();
              } else {
                onStepChange(currentStep + 1);
              }
            }}
          >
            {currentStep === 4 ? "Submit" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

function FormTooltip({ content }: { content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-muted-foreground ml-2" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function BasicDetails({ form }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Institution Details</h2>
        <p className="text-sm text-muted-foreground">
          Please provide your institution's basic information
        </p>
      </div>

      <FormField
        control={form.control}
        name="institutionName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              Institution Name
              <FormTooltip content="Enter the full legal name of your institution" />
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter institution name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Institution Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {institutionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="establishedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Established Year</FormLabel>
              <FormControl>
                <Input type="number" placeholder="YYYY" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="affiliationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Affiliation Number
                <FormTooltip content="Your AICTE/UGC or relevant affiliation number" />
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., AICTE123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="City, State" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function ContactInformation({ form }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <p className="text-sm text-muted-foreground">
          Provide official contact details for your institution
        </p>
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Official Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="official@institution.edu"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Phone</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alternatePhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternate Phone</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="Full postal address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal/ZIP Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter postal code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function AdminDetails({ form }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Admin Account Details</h2>
        <p className="text-sm text-muted-foreground">
          Set up the primary administrator account
        </p>
      </div>

      <FormField
        control={form.control}
        name="adminName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="designation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Designation</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="principal">Principal</SelectItem>
                <SelectItem value="director">Director</SelectItem>
                <SelectItem value="registrar">Registrar</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="adminEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Admin Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="admin@institution.edu"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="adminPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>Must be at least 8 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function DocumentUpload({ form }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Document Upload</h2>
        <p className="text-sm text-muted-foreground">
          Upload the required documents in PDF or DOC format
        </p>
      </div>

      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="affiliationCertificate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affiliation Certificate</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf,.doc,.docx" {...field} />
              </FormControl>
              <FormDescription>
                Upload PDF or DOC format (max 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="governmentRecognition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Government Recognition</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf,.doc,.docx" {...field} />
              </FormControl>
              <FormDescription>
                Upload PDF or DOC format (max 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="letterhead"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute Letterhead</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf,.doc,.docx" {...field} />
              </FormControl>
              <FormDescription>
                Upload PDF or DOC format (max 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>I accept the terms and conditions</FormLabel>
              <FormDescription>
                By checking this box, you agree to our Terms of Service and
                Privacy Policy.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}

export default InstitutionRegistrationForm;
