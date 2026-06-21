import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LockKey, ShieldCheck, User } from "phosphor-react";
import { twMerge } from "tailwind-merge";
import { useMe } from "@/hooks/useMe";

type ProfileTab = "profile" | "security";

type ProfileData = {
  id?: string;
  role?: string;
  profile?: Partial<ProfileData>;
  name?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  telefone?: string;
  birthDate?: string;
  gender?: string;
  crm?: string;
  speciality?: string;
  specialties?: string[];
  address?: ProfileAddress;
  endereco?: ProfileAddress;
  doctor?: Partial<ProfileData>;
  patient?: Partial<ProfileData>;
  user?: Partial<ProfileData>;
};

type ProfileAddress = {
  street?: string;
  logradouro?: string;
  rua?: string;
  number?: string;
  numero?: string;
  district?: string;
  neighborhood?: string;
  bairro?: string;
  city?: string;
  cidade?: string;
  state?: string;
  uf?: string;
  cep?: string;
  zipcode?: string;
};

type EditableProfile = {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  crm: string;
  specialities: string;
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zipcode: string;
  };
};

type ProfileFieldProps = {
  label: string;
  value?: string;
  compact?: boolean;
  isEditing?: boolean;
  onChange?: (value: string) => void;
};

const tabItems = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "security", label: "Segurança", icon: ShieldCheck },
] satisfies Array<{
  id: ProfileTab;
  label: string;
  icon: typeof User;
}>;

function pickValue(...values: Array<string | undefined>) {
  return values.find((value) => value && value.trim().length > 0);
}

function formatPhone(phone?: string) {
  if (!phone) {
    return undefined;
  }

  const digits = phone.replace(/\D/g, "");

  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return phone;
}

function formatGender(gender?: string) {
  if (!gender) {
    return undefined;
  }

  return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
}

function formatSpeciality(speciality?: string) {
  if (!speciality) {
    return undefined;
  }

  return speciality
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatBirthDate(birthDate?: string) {
  if (!birthDate) {
    return undefined;
  }

  const parsedDate = new Date(`${birthDate}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return birthDate;
  }

  return format(parsedDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

function hasAddress(address?: Partial<EditableProfile["address"]>) {
  if (!address) {
    return false;
  }

  return Object.values(address).some(
    (value) => typeof value === "string" && value.trim().length > 0,
  );
}

function createEmptyEditableProfile(): EditableProfile {
  return {
    fullName: "",
    cpf: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    crm: "",
    specialities: "",
    address: {
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      zipcode: "",
    },
  };
}

function ProfileField({
  label,
  value,
  compact = false,
  isEditing = false,
  onChange,
}: ProfileFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-black">{label}</span>
      {isEditing ? (
        <input
          value={value ?? ""}
          onChange={(event) => onChange?.(event.target.value)}
          className={twMerge(
            "form-field-focus min-h-12 w-full rounded-md border border-[#A8DFF3] bg-[#E5F6FC] px-4 text-sm text-neutral-700 outline-none",
            compact && "max-w-xs bg-white font-semibold text-black",
          )}
        />
      ) : (
        <span
          className={twMerge(
            "flex min-h-12 w-full items-center rounded-md bg-[#E5F6FC] px-4 text-sm text-neutral-700",
            compact &&
              "max-w-xs border border-neutral-200 bg-white font-semibold text-black",
          )}
        >
          {value || "Não informado"}
        </span>
      )}
    </label>
  );
}

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editableProfile, setEditableProfile] = useState<EditableProfile>(
    createEmptyEditableProfile,
  );
  const { data, isError, isLoading } = useMe();

  const profile = useMemo(() => {
    const me = (data ?? {}) as ProfileData;
    const nested = (me.profile ??
      me.doctor ??
      me.patient ??
      me.user ??
      {}) as ProfileData;
    const role = pickValue(me.role, me.crm || nested.crm ? "ROLE_DOCTOR" : undefined);
    const specialities = [
      ...((me.specialties ?? nested.specialties) || []),
      ...[me.speciality, nested.speciality].filter(Boolean),
    ];
    const address = nested.endereco ?? nested.address ?? me.endereco ?? me.address;

    return {
      role,
      fullName: pickValue(nested.name, nested.nome, me.name, me.nome),
      email: pickValue(me.email, nested.email),
      cpf: pickValue(me.cpf, nested.cpf),
      phone: formatPhone(
        pickValue(nested.phone, nested.telefone, me.phone, me.telefone),
      ),
      birthDate: formatBirthDate(pickValue(me.birthDate, nested.birthDate)),
      gender: formatGender(pickValue(me.gender, nested.gender)),
      crm: pickValue(me.crm, nested.crm),
      specialities: specialities.map((speciality) => formatSpeciality(speciality)).join(" | "),
      address: {
        street: pickValue(address?.street, address?.logradouro, address?.rua),
        number: pickValue(address?.number, address?.numero),
        district: pickValue(address?.district, address?.neighborhood, address?.bairro),
        city: pickValue(address?.city, address?.cidade),
        state: pickValue(address?.state, address?.uf),
        zipcode: pickValue(address?.zipcode, address?.cep),
      },
    };
  }, [data]);

  const isDoctor = profile.role === "ROLE_DOCTOR" || Boolean(profile.crm);
  const shouldShowAddress =
    hasAddress(profile.address) || hasAddress(editableProfile.address);

  useEffect(() => {
    if (isEditingProfile) {
      return;
    }

    setEditableProfile({
      fullName: profile.fullName ?? "",
      cpf: profile.cpf ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      birthDate: profile.birthDate ?? "",
      gender: profile.gender ?? "",
      crm: profile.crm ?? "",
      specialities: profile.specialities ?? "",
      address: {
        street: profile.address.street ?? "",
        number: profile.address.number ?? "",
        district: profile.address.district ?? "",
        city: profile.address.city ?? "",
        state: profile.address.state ?? "",
        zipcode: profile.address.zipcode ?? "",
      },
    });
  }, [data]);

  function updateEditableProfile(field: keyof Omit<EditableProfile, "address">) {
    return (value: string) => {
      setEditableProfile((current) => ({
        ...current,
        [field]: value,
      }));
    };
  }

  function updateEditableAddress(field: keyof EditableProfile["address"]) {
    return (value: string) => {
      setEditableProfile((current) => ({
        ...current,
        address: {
          ...current.address,
          [field]: value,
        },
      }));
    };
  }

  return (
    <section className="mx-auto w-full max-w-[1120px] px-4 py-6 md:py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-black">Configurações</h1>
        <p className="mt-2 text-xl text-black">
          Gerencie seu perfil e preferências de segurança
        </p>
      </header>

      <div className="mb-8 flex rounded-full bg-[#0094CB] p-1">
        {tabItems.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={twMerge(
                "flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full text-base font-semibold text-white transition-colors",
                isActive && "bg-white text-black",
              )}
            >
              <Icon size={22} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-md border border-[#A8DFF3] bg-white px-5 py-7 md:px-8 md:py-9">
        {isLoading && (
          <p className="text-sm font-semibold text-neutral-600">
            Carregando informações do perfil...
          </p>
        )}

        {isError && (
          <p className="text-sm font-semibold text-red-600">
            Não foi possível carregar seus dados agora.
          </p>
        )}

        {!isLoading && activeTab === "profile" && (
          <div>
            <h2 className="mb-10 text-xl font-bold text-black">
              Informações de Perfil
            </h2>

            <div className="space-y-7">
              <ProfileField
                isEditing={isEditingProfile}
                label="Nome Completo:"
                value={editableProfile.fullName}
                onChange={updateEditableProfile("fullName")}
              />
              <ProfileField
                isEditing={isEditingProfile}
                label="CPF:"
                value={editableProfile.cpf}
                onChange={updateEditableProfile("cpf")}
              />

              {isDoctor && (
                <>
                  <ProfileField
                    isEditing={isEditingProfile}
                    label="CRM:"
                    value={editableProfile.crm}
                    onChange={updateEditableProfile("crm")}
                  />
                  <ProfileField
                    isEditing={isEditingProfile}
                    label="Especialidade:"
                    value={editableProfile.specialities}
                    onChange={updateEditableProfile("specialities")}
                  />
                </>
              )}

              <ProfileField
                isEditing={isEditingProfile}
                label="Email:"
                value={editableProfile.email}
                onChange={updateEditableProfile("email")}
              />

              {!isDoctor && (
                <>
                  <ProfileField
                    compact
                    isEditing={isEditingProfile}
                    label="Data de Nascimento:"
                    value={editableProfile.birthDate}
                    onChange={updateEditableProfile("birthDate")}
                  />
                  <ProfileField
                    isEditing={isEditingProfile}
                    label="Gênero Biológico:"
                    value={editableProfile.gender}
                    onChange={updateEditableProfile("gender")}
                  />
                </>
              )}

              <ProfileField
                isEditing={isEditingProfile}
                label="Número de Celular:"
                value={editableProfile.phone}
                onChange={updateEditableProfile("phone")}
              />

              {shouldShowAddress && (
                <>
                  <h3 className="pt-4 text-lg font-bold text-black">Endereço</h3>
                  <ProfileField
                    isEditing={isEditingProfile}
                    label="Logradouro:"
                    value={editableProfile.address.street}
                    onChange={updateEditableAddress("street")}
                  />
                  <ProfileField
                    isEditing={isEditingProfile}
                    label="Número:"
                    value={editableProfile.address.number}
                    onChange={updateEditableAddress("number")}
                  />
                  <ProfileField
                    isEditing={isEditingProfile}
                    label="Bairro:"
                    value={editableProfile.address.district}
                    onChange={updateEditableAddress("district")}
                  />
                  <ProfileField
                    isEditing={isEditingProfile}
                    label="Cidade:"
                    value={editableProfile.address.city}
                    onChange={updateEditableAddress("city")}
                  />
                  <ProfileField
                    isEditing={isEditingProfile}
                    label="Estado:"
                    value={editableProfile.address.state}
                    onChange={updateEditableAddress("state")}
                  />
                  <ProfileField
                    isEditing={isEditingProfile}
                    label="CEP:"
                    value={editableProfile.address.zipcode}
                    onChange={updateEditableAddress("zipcode")}
                  />
                </>
              )}
            </div>

            <div className="mt-14 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditingProfile((current) => !current)}
                className="rounded-md bg-[#0094CB] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                {isEditingProfile ? "Salvar Perfil" : "Editar Perfil"}
              </button>
            </div>
          </div>
        )}

        {!isLoading && activeTab === "security" && (
          <div>
            <h2 className="mb-10 text-xl font-bold text-black">
              Informações de Segurança
            </h2>

            <div className="mb-8 flex items-center gap-5">
              <LockKey size={22} />
              <span className="text-sm font-bold text-black">Alterar Senha:</span>
            </div>

            <div className="space-y-7">
              <ProfileField label="Senha Atual:" value=" " />
              <ProfileField label="Nova Senha:" value=" " />
              <ProfileField label="Confirmar nova Senha:" value=" " />
            </div>

            <button
              type="button"
              className="mt-7 rounded-md bg-[#0094CB] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              Atualizar Senha
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
