import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../../../shared/theme';
import { SalonHeader } from '../../../shared/components/SalonHeader';
import {
  mockCategories,
  mockServicesList,
  ServiceCategory,
  ServiceItem,
  formatRupee,
} from '../../../shared/api/mockData';

export const ServicesScreen = () => {
  const [activeSegment, setActiveSegment] = useState<'categories' | 'serviceList'>('categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<ServiceCategory[]>(mockCategories);
  const [services, setServices] = useState<ServiceItem[]>(mockServicesList);

  // Modals state
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isNewServiceOpen, setIsNewServiceOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // New Category Form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Service Form state
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDuration, setServiceDuration] = useState('60');
  const [isPopular, setIsPopular] = useState(true);

  const handleOpenEditService = (service: ServiceItem) => {
    setEditingService(service);
    setServiceName(service.name);
    setServicePrice(service.price.toString());
    setServiceDuration(service.duration);
    setIsPopular(!!service.popular);
  };

  const handleAddCategory = () => {
    if (newCatName.trim()) {
      setCategories([
        ...categories,
        {
          id: `cat_${Date.now()}`,
          name: newCatName.trim(),
          serviceCount: 0,
          imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500',
        },
      ]);
      setNewCatName('');
      setNewCatDesc('');
      setIsAddCategoryOpen(false);
    }
  };

  const handleSaveService = () => {
    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                name: serviceName,
                price: Number(servicePrice) || s.price,
                duration: serviceDuration,
                popular: isPopular,
              }
            : s
        )
      );
      setEditingService(null);
    } else if (serviceName.trim()) {
      setServices([
        ...services,
        {
          id: `srv_${Date.now()}`,
          name: serviceName.trim(),
          category: 'Hair',
          duration: `${serviceDuration}m`,
          price: Number(servicePrice) || 2000,
          popular: isPopular,
        },
      ]);
      setIsNewServiceOpen(false);
    }
  };

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <SalonHeader
        rightActionIcon="add-outline"
        onRightActionPress={() =>
          activeSegment === 'categories'
            ? setIsAddCategoryOpen(true)
            : setIsNewServiceOpen(true)
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <View style={styles.headerSection}>
          <Text style={styles.caption}>THE TREATMENT MENU</Text>
          <Text style={styles.title}>
            Services & <Text style={{ fontStyle: 'italic', fontWeight: '400' }}>rituals.</Text>
          </Text>
        </View>

        {/* Segmented Control */}
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeSegment === 'categories' && styles.segmentTabActive,
            ]}
            onPress={() => setActiveSegment('categories')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.segmentText,
                activeSegment === 'categories' && styles.segmentTextActive,
              ]}
            >
              Categories
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentTab,
              activeSegment === 'serviceList' && styles.segmentTabActive,
            ]}
            onPress={() => setActiveSegment('serviceList')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.segmentText,
                activeSegment === 'serviceList' && styles.segmentTextActive,
              ]}
            >
              Service list
            </Text>
          </TouchableOpacity>
        </View>

        {/* 1. Categories View */}
        {activeSegment === 'categories' ? (
          <View>
            <View style={styles.sectionHeaderRow}>
              <View>
                <Text style={styles.subCaption}>SERVICE CATEGORIES</Text>
                <Text style={styles.subTitle}>Explore your menu</Text>
              </View>
              <Text style={styles.countBadge}>{categories.length} categories</Text>
            </View>

            {/* 2-Column Categories Grid */}
            <View style={styles.categoryGrid}>
              {categories.map((cat) => (
                <View key={cat.id} style={styles.categoryCard}>
                  <Image source={{ uri: cat.imageUrl }} style={styles.categoryImage} />
                  <View style={styles.categoryOverlay}>
                    <View style={styles.categoryHeader}>
                      <TouchableOpacity
                        style={styles.actionIconPill}
                        onPress={() => setIsNewServiceOpen(true)}
                      >
                        <Ionicons name="pencil" size={12} color={colors.plumDeep} />
                      </TouchableOpacity>
                      <View style={styles.categoryCountBadge}>
                        <Text style={styles.categoryCountText}>
                          {cat.serviceCount}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                    <Text style={styles.categoryServicesText}>
                      {cat.serviceCount} services
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          /* 2. Service List View */
          <View>
            {/* Search Bar */}
            <View style={styles.searchRow}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={16} color={colors.textMuted} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search treatments..."
                  placeholderTextColor={colors.textMuted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setIsNewServiceOpen(true)}
              >
                <Ionicons name="add" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>

            {/* Service Rows */}
            {filteredServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceRow}
                onPress={() => handleOpenEditService(service)}
                activeOpacity={0.7}
              >
                <View style={styles.serviceAvatar}>
                  <Text style={styles.serviceAvatarText}>
                    {service.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceMeta}>
                    {service.category} · {service.duration}
                  </Text>
                </View>
                <Text style={styles.servicePrice}>
                  {formatRupee(service.price)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modal 1: New Category Sheet */}
      <Modal visible={isAddCategoryOpen} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New category</Text>
              <TouchableOpacity onPress={() => setIsAddCategoryOpen(false)}>
                <Ionicons name="close-circle-outline" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>CATEGORY NAME</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Bridal Packages"
              value={newCatName}
              onChangeText={setNewCatName}
            />

            <Text style={styles.inputLabel}>DESCRIPTION</Text>
            <TextInput
              style={[styles.modalInput, { height: 70 }]}
              placeholder="What treatments does this category include?"
              multiline
              value={newCatDesc}
              onChangeText={setNewCatDesc}
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={() => setIsAddCategoryOpen(false)}
              >
                <Text style={styles.btnSecondaryText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={handleAddCategory}
              >
                <Text style={styles.btnPrimaryText}>Add category</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal 2: Edit / New Service Sheet */}
      <Modal
        visible={isNewServiceOpen || !!editingService}
        transparent
        animationType="slide"
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingService ? 'Edit service' : 'New service'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsNewServiceOpen(false);
                  setEditingService(null);
                }}
              >
                <Ionicons name="close-circle-outline" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>SERVICE NAME</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Signature Balayage"
              value={serviceName}
              onChangeText={setServiceName}
            />

            <View style={styles.twoColumnRow}>
              <View style={{ flex: 1, marginRight: spacing.sm }}>
                <Text style={styles.inputLabel}>DURATION (MIN)</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="e.g. 60"
                  value={serviceDuration}
                  onChangeText={setServiceDuration}
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1, marginLeft: spacing.sm }}>
                <Text style={styles.inputLabel}>PRICE (₹)</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="e.g. 2500"
                  value={servicePrice}
                  onChangeText={setServicePrice}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Quick chips */}
            <View style={styles.chipsRow}>
              {['30 min', '45 min', '1 hr', '1h 30m', '2 hr'].map((chip) => (
                <TouchableOpacity
                  key={chip}
                  style={styles.chip}
                  onPress={() => setServiceDuration(chip)}
                >
                  <Text style={styles.chipText}>{chip}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Popular Toggle */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Mark as popular</Text>
              <Switch
                value={isPopular}
                onValueChange={setIsPopular}
                trackColor={{ false: colors.border, true: colors.purple }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={() => {
                  setIsNewServiceOpen(false);
                  setEditingService(null);
                }}
              >
                <Text style={styles.btnSecondaryText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={handleSaveService}
              >
                <Text style={styles.btnPrimaryText}>
                  {editingService ? 'Save changes' : 'Add service'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lavender,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerSection: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  caption: {
    ...typography.captionTracked,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.serifH1,
    fontSize: 28,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#E6DCF0',
    borderRadius: radius.pill,
    padding: 3,
    marginBottom: spacing.lg,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.pill,
  },
  segmentTabActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  segmentTextActive: {
    color: colors.plumDeep,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  subCaption: {
    ...typography.captionTracked,
    fontSize: 10,
    marginBottom: 2,
  },
  subTitle: {
    ...typography.serifH2,
    fontSize: 18,
  },
  countBadge: {
    fontSize: 12,
    color: colors.purple,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 180,
    borderRadius: radius.card,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  categoryOverlay: {
    flex: 1,
    backgroundColor: 'rgba(43, 10, 59, 0.45)',
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIconPill: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCountBadge: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  categoryCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 2,
  },
  categoryServicesText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    height: 44,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 13,
    color: colors.textPrimary,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.card,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  serviceAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.purple,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.plumDeep,
    marginBottom: 2,
  },
  serviceMeta: {
    fontSize: 12,
    color: colors.textMuted,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.plumDeep,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.serifH2,
  },
  inputLabel: {
    ...typography.captionTracked,
    fontSize: 10,
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: colors.lavender,
    borderRadius: radius.input,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    marginBottom: spacing.md,
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  chip: {
    backgroundColor: colors.lavender,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  chipText: {
    fontSize: 11,
    color: colors.purple,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.plumDeep,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnSecondary: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
  },
  btnPrimary: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.purple,
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
});
