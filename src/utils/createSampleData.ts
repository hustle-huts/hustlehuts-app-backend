import ICafe from "../models/interfaces/cafe.interface";
import { cafeService } from "../services";

export async function createSampleData() {
  const cafe_payloads: Partial<ICafe>[] = [
    {
      name: "Plain Vanilla",
      address: "167 Neil Rd Singapore 088888",
      open_at: "07:30",
      close_at: "19:00",
      credit: 1,
      has_wifi: true,
      has_charging: true,
      has_ambience: true,
      image_url:
        "https://instagram.fsin3-1.fna.fbcdn.net/v/t51.2885-15/333534226_887213012497288_7186382956163315489_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fsin3-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=ubIglxjbI9IAX8e5vzQ&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MzA1Mzg4MDQyNTMzNzIzNTgzNA%3D%3D.2-ccb7-5&oh=00_AfCAiQ87ormaEaNIY-yqiyoBjUGc3qqXk6vp1FGoFSut2Q&oe=642DCC0A&_nc_sid=30a2ef",
      availability_time_slots: [
        {
          date: "2023-04-05",
          time: ["08:00", "09:00", "10:00"],
          seat: 10,
        },
      ],
    },
    {
      name: "Tag Expresso",
      address: "391 Orchard Rd, #02 - 11, Tower B, Singapore 238872",
      open_at: "08:00",
      close_at: "20:00",
      credit: 1,
      has_wifi: false,
      has_charging: true,
      has_ambience: true,
      image_url:
        "https://instagram.fsin3-1.fna.fbcdn.net/v/t51.2885-15/334794143_3480671752191964_3136036782570438980_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fsin3-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=YBFyZrDBuWMAX-afa73&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzA1NzM3NDY2NTMyMTExODY4OA%3D%3D.2-ccb7-5&oh=00_AfDUq_6vCfiwJ-UtaRuEQfpNUKNPspvNcM6AzyFrnCgCNw&oe=642F8D24&_nc_sid=6136e7",
      availability_time_slots: [
        {
          date: "2023-04-05",
          time: ["08:00", "09:00", "10:00"],
          seat: 10,
        },
      ],
    },
  ];

  for (const cafe of cafe_payloads) {
    await cafeService.insert(cafe);
  }
}
